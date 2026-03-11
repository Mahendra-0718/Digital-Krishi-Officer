# AGRIVERSE Backend

FastAPI application serving the AI logic.

## Setup
1. `pip install -r requirements.txt`
2. Configure `.env`.
3. Run `uvicorn app.main:app --reload`.

## Structure
- `app/api`: Endpoints.
- `app/services`: Logic (LLM, RAG, etc).
- `app/data`: FAISS index storage.
