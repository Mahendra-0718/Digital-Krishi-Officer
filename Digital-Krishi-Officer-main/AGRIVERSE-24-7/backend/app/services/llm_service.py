from langchain_community.llms import Ollama
from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger(__name__)

class LLMService:
    def __init__(self):
        self.llm = Ollama(
            base_url=settings.OLLAMA_BASE_URL,
            model=settings.OLLAMA_MODEL
        )

    def generate_response(self, context: str, query: str) -> str:
        """
        Generates a response strictly grounded in retrieved context.
        """
        prompt = f"""
You are an agricultural advisory AI for AGRIVERSE-24/7.

RULES (VERY IMPORTANT):
1. Answer ONLY using the information provided in the context.
2. DO NOT use outside or general knowledge.
3. If the answer is NOT present in the context, respond with:
   "I do not have enough reliable information to answer this question."

Context:
{context}

Question:
{query}

Answer:
"""

        try:
            logger.info(f"Sending grounded prompt to Ollama ({settings.OLLAMA_MODEL})...")
            response = self.llm.invoke(prompt)
            return response.strip()
        except Exception as e:
            logger.error(f"LLM generation failed: {e}")
            return "I am currently unable to generate a response. Please try again later."

llm_service = LLMService()
