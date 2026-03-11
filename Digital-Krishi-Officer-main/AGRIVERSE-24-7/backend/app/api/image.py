from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.vision_service import vision_service

router = APIRouter()

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    content = await file.read()
    result = vision_service.analyze_image(content)
    
    return {"analysis": result}
