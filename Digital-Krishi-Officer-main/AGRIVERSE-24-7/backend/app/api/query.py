from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.db.database import get_db
from app.db.models import Interaction
from app.services.translate_service import translate_service
from app.services.rag_service import rag_service
from app.services.llm_service import llm_service
from app.services.confidence_service import confidence_service
from app.core.logger import get_logger

router = APIRouter()
logger = get_logger(__name__)

class QueryRequest(BaseModel):
    query: str
    language: Optional[str] = None # Optional, can be auto-detected

class QueryResponse(BaseModel):
    response: str
    original_query: str
    detected_language: str
    confidence: float
    status: str # "success", "low_confidence"

def save_interaction(db: Session, query_text: str, lang: str, response: str, confidence: float):
    interaction = Interaction(
        query_text=query_text,
        query_language=lang,
        response_text=response,
        confidence_score=confidence,
        interaction_type="text"
    )
    db.add(interaction)
    db.commit()

@router.post("/submit", response_model=QueryResponse)
async def submit_query(
    request: QueryRequest, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        # 1. Specialized detection for Indian languages (Tenglish/Hinglish/Scripts)
        from app.services.language_detect import detect_language_text
        detection = detect_language_text(request.query)
        custom_src = detection['code']

        # 2. Translate
        trans_result = await translate_service.translate_to_english(request.query)
        eng_query = trans_result["text"]
        
        # Override translation detection with our specialized detector if it has high confidence
        # (Standard translators often fail on Hinglish/Tenglish scripts)
        src_lang = custom_src if custom_src != 'en' else trans_result["src"]
        
        # Fallback if both are 'en' but frontend requested something else
        if src_lang == 'en' and request.language:
            # Map full language name to code if necessary
            mapping = {"Hindi": "hi", "Telugu": "te", "Tamil": "ta"}
            src_lang = mapping.get(request.language, "en")

        # 2. RAG Retrieval
        context = rag_service.retrieve_context(eng_query)

        # 3. LLM Generation
        llm_response_eng = llm_service.generate_response(context, eng_query)

        # 4. Confidence
        confidence = confidence_service.evaluate_confidence(eng_query, context)

        # 5. Logic Branching
        final_response_eng = llm_response_eng
        status = "success"
        
        CONFIDENCE_THRESHOLD = 0.5
        if confidence < CONFIDENCE_THRESHOLD:
            # Escalation logic placeholder
            final_response_eng += "\n\n(Note: Confidence is low. We recommend consulting a local expert.)"
            status = "low_confidence"

        # 6. Translate Back
        final_response_local = await translate_service.translate_from_english(final_response_eng, src_lang)

        # 7. Save History (Background)
        background_tasks.add_task(save_interaction, db, request.query, src_lang, final_response_local, confidence)

        return QueryResponse(
            response=final_response_local,
            original_query=request.query,
            detected_language=src_lang,
            confidence=confidence,
            status=status
        )

    except Exception as e:
        logger.error(f"Query processing error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
