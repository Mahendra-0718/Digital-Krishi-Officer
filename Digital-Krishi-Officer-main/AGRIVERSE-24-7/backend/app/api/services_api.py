from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from app.services.language_detect import detect_language_text
from app.services.vision_analysis import analyze_image
from PIL import Image
import io

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/language/detect")
async def detect_language(request: TextRequest):
    """
    Detect language from text.
    """
    result = detect_language_text(request.text)
    return result

@router.post("/vision/analyze")
async def analyze_vision(file: UploadFile = File(...)):
    """
    Analyze image for crop health and advisory.
    """
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image.")
    
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        result = analyze_image(image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
