from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.database import get_db
from app.db.models import Interaction

router = APIRouter()

class FeedbackRequest(BaseModel):
    interaction_id: int
    rating: int # 1-5
    comment: str = None

@router.post("/submit")
def submit_feedback(feedback: FeedbackRequest, db: Session = Depends(get_db)):
    interaction = db.query(Interaction).filter(Interaction.id == feedback.interaction_id).first()
    if not interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")
    
    interaction.feedback_rating = feedback.rating
    interaction.feedback_comment = feedback.comment
    db.commit()
    
    return {"message": "Feedback received successfully"}
