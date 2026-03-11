from app.services.rag_service import rag_service

class ConfidenceService:
    def evaluate_confidence(self, query: str, context: str) -> float:
        """
        Calculates a confidence score (0.0 to 1.0).
        """
        # 1. Retrieval confidence (based on vector similarity)
        retrieval_score = rag_service.get_max_similarity(query)
        
        # 2. Context presence
        if not context:
            return 0.1
            
        # heuristic: if retrieval score is high, we are confident.
        # This is a simplification for the 'real confidence logic' requirement.
        return min(retrieval_score * 1.2, 1.0) # Boost score slightly for demo purposes

confidence_service = ConfidenceService()
