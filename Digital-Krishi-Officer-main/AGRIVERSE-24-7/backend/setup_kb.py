import os
import sys

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.rag_service import rag_service
from app.services.vision_analysis import load_kb

def setup():
    print("--- AGRIVERSE Knowledge Base Setup ---")
    
    print("1. Loading Vision Knowledge Base...")
    load_kb()
    
    print("2. Re-indexing Agricultural Chat Data (FAISS)...")
    # This will trigger document loading and index creation/refresh
    rag_service._load_index()
    
    print("--- Setup Complete ---")
    print(f"Total Chat Docs Index: {len(rag_service.documents)}")

if __name__ == "__main__":
    setup()
