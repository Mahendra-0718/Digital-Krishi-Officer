# AGRIVERSE-24-7

## Problem Statement
Farmers in remote areas lack instant, accurate, and localized agricultural advice. Language barriers and lack of expert access lead to crop loss and reduced yield. **AGRIVERSE-24/7** solves this by providing an AI-powered advisory system accessible via Text, Voice, and Image.

## Architecture
(See `docs/architecture.png`)
The system consists of a **FastAPI Backend** and a **Next.js Frontend**.
- **Frontend**: Captures user input (text/voice/image), sends to backend.
- **Backend**:
    1. **Translation**: Converts local language to English.
    2. **RAG Pipeline**: Retrieves context from FAISS knowledge base.
    3. **LLM (Ollama)**: Generates expert advice using retrieved context.
    4. **Confidence**: Evaluates answer quality.
    5. **Response**: Translates back to user language and returns.

## Features
- 🗣️ **Multilingual Support**: Auto-translation for local Indic languages.
- 🎤 **Voice Input**: Web Speech API integration.
- 📸 **Image Analysis**: Basic crop disease detection using vision service.
- 🧠 **RAG & LLM**: Context-aware answers using local Ollama model.
- ⚡ **Real-time Confidence**: Confidence scoring to warn users of uncertain answers.

## Tech Stack (FREE & OPEN SOURCE)
- **Backend**: Python, FastAPI, LangChain, FAISS, Sentence-Transformers, Ollama.
- **Frontend**: Next.js, Tailwind CSS, Web Speech API.
- **Database**: PostgreSQL (via SQLAlchemy, defaulting to SQLite for local demo).
- **Deployment**: Render (Backend), Vercel (Frontend).

## How to Run Locally

### Prerequisites
1. Install [Ollama](https://ollama.ai/) and run `ollama run mistral`.
2. Python 3.9+ and Node.js 18+.

### Backend
1. **Setup Environment**:
   ```bash
   cd backend
   python -m venv venv
   # Windows: venv\Scripts\activate
   # Linux/Mac: source venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Setup Knowledge Base**:
   Run this once to build the FAISS index and vision database:
   ```bash
   python setup_kb.py
   ```
3. **Run Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:3000`.

## Features (Optimized)
- 🗣️ **Ultra-Robust Language Detection**: Hybrid heuristic/statistical engine for Tenglish (Telugu+English) and Hinglish.
- 🔊 **Bulletproof TTS**: Microsoft-optimized Telugu/Hindi speech output with manual trigger support.
- 📸 **Advanced Vision KB**: Authenticated diagnostic profiles for regional pests (Bollworm, Fall Armyworm, etc.).
- 🧠 **Auto-Refreshed RAG**: Semantic index that automatically updates when you add data to `agri_data.txt`.

## Deployment Ready
1. **Backend**: Deploy on **Render** or **Railway**. 
   - Root: `backend`
   - Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
   - Env: Set `API_BASE_URL` in frontend to point to this.
2. **Frontend**: Deploy on **Vercel**.
   - Root: `frontend`
   - Build Command: `next build`
   - Install Command: `npm install`
