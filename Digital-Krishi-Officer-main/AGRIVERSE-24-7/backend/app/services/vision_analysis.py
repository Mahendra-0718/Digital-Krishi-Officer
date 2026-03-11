import json
import os
import torch
from PIL import Image
from sentence_transformers import SentenceTransformer, util

# --- KB_BASED CONFIG ---
KB_PATH = os.path.join(os.path.dirname(__file__), "../data/disease_kb.json")

# Load Model
try:
    model = SentenceTransformer('clip-ViT-B-32')
except Exception as e:
    print(f"Warning: Could not load CLIP Model: {e}")
    model = None

# Load Knowledge Base
knowledge_base = []
kb_embeddings = None

def load_kb():
    global knowledge_base, kb_embeddings
    if not os.path.exists(KB_PATH):
        print(f"KB not found at {KB_PATH}")
        return

    try:
        with open(KB_PATH, 'r') as f:
            knowledge_base = json.load(f)
        
        # Pre-compute text embeddings for descriptions
        descriptions = [item['description'] for item in knowledge_base]
        if model:
            kb_embeddings = model.encode(descriptions, convert_to_tensor=True)
            print(f"Loaded {len(knowledge_base)} entries from Disease KB.")
    except Exception as e:
        print(f"Error loading KB: {e}")

# Initial Load
load_kb()

def calibrate_confidence(raw_score):
    """
    CLIP raw cosine scores are usually between 0.20 and 0.35 for good matches.
    We map this to a user-friendly 0-100% scale.
    
    0.20 -> 50%
    0.25 -> 80%
    0.30 -> 95%
    """
    min_score = 0.20
    max_score = 0.32
    
    if raw_score <= min_score:
        # Linear drop below min_score
        return round(max(0, raw_score / min_score) * 50, 2)
    
    # Linear interpolation between min and max
    normalized = (raw_score - min_score) / (max_score - min_score)
    # Map 0-1 to 0.5-1.0
    val = 0.5 + (normalized * 0.5)
    
    return round(min(1.0, val), 4)

def analyze_image(image: Image.Image) -> dict:
    """
    Analyzes image by comparing against Knowledge Base descriptions.
    """
    if model is None or kb_embeddings is None:
        return {"diagnosis": "System Error", "action": "KB/Model not loaded.", "confidence": 0}

    try:
        # Encode Image
        img_emb = model.encode(image, convert_to_tensor=True)
        
        # Compare with KB
        cosine_scores = util.cos_sim(img_emb, kb_embeddings)
        best_idx = torch.argmax(cosine_scores).item()
        best_score = cosine_scores[0][best_idx].item()
        
        match = knowledge_base[best_idx]
        
        # Calibration
        user_confidence = calibrate_confidence(best_score)
        
        # Threshold Logic
        # Raw score threshold for "Uncertainty"
        RAW_THRESHOLD = 0.22 

        if best_score < RAW_THRESHOLD:
            return {
                "diagnosis": "Uncertain Diagnosis",
                "action": "Probably it is a crop disease, but better to consult an expert.",
                "confidence": user_confidence,
                "crop_type": "Unknown"
            }

        return {
            "diagnosis": match['label'],
            "action": match['action'],
            "confidence": user_confidence,
            "crop_type": match['label'].split(' ')[0] if ' ' in match['label'] else "Crop"
        }

    except Exception as e:
        print(f"Vision KB Error: {e}")
        return {"diagnosis": "Error", "action": str(e), "confidence": 0}
