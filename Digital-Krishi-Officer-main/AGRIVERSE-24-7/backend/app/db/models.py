from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.db.database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    query_text = Column(Text, nullable=False)
    query_language = Column(String, default="en")
    response_text = Column(Text, nullable=False)
    confidence_score = Column(Float, nullable=True)
    feedback_rating = Column(Integer, nullable=True) # 1-5
    feedback_comment = Column(Text, nullable=True)
    interaction_type = Column(String, default="text") # text, voice, image
    image_path = Column(String, nullable=True)
