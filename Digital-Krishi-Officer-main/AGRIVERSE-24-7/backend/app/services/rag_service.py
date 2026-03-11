import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from app.core.logger import get_logger

logger = get_logger(__name__)

class RAGService:
    def __init__(self):
        self.encoder = SentenceTransformer("all-MiniLM-L6-v2")
        self.index_path = "app/data/faiss_index/index.faiss"
        self.kb_path = "app/data/kb"
        self.index = None
        self.documents = []
        self._load_index()

    def _load_documents(self):
        """
        Loads all text documents from the KB folder.
        """
        documents = []

        if os.path.exists(self.kb_path):
            for filename in os.listdir(self.kb_path):
                if filename.endswith(".txt"):
                    file_path = os.path.join(self.kb_path, filename)
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            for line in f:
                                line = line.strip()
                                if line:
                                    documents.append(line)
                    except Exception as e:
                        logger.error(f"Failed to read {filename}: {e}")

        return documents

    def _load_index(self):
        """
        Loads FAISS index and KB documents.
        Re-creates index if documents have changed or index is missing.
        """
        self.documents = self._load_documents()
        
        # Check if we should re-index
        should_reindex = not os.path.exists(self.index_path)
        
        if not should_reindex:
            try:
                self.index = faiss.read_index(self.index_path)
                # If document count doesn't match index size (simple check), re-index
                if self.index.ntotal != len(self.documents):
                    logger.warning("Index document count mismatch. Re-indexing...")
                    should_reindex = True
                else:
                    logger.info(f"FAISS index loaded with {len(self.documents)} documents.")
            except Exception as e:
                logger.error(f"Failed to load FAISS index: {e}")
                should_reindex = True

        if should_reindex:
            self._create_index()

    def _create_index(self):
        """
        Creates FAISS index from KB documents.
        """
        if not self.documents:
            logger.warning("KB is empty. Using fallback sample data.")
            self.documents = [
                "Wheat requires 12-15 inches of water per growing season.",
                "Best time to sow cotton is usually in spring when soil temperature is above 60°F.",
                "To control aphids, you can use neem oil or insecticidal soap.",
                "Tomato early blight appears as concentric rings on lower leaves.",
                "Urea is a common nitrogen fertilizer used for rice crops."
            ]

        embeddings = self.encoder.encode(self.documents)
        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(np.array(embeddings).astype("float32"))

        os.makedirs(os.path.dirname(self.index_path), exist_ok=True)
        faiss.write_index(self.index, self.index_path)

        logger.info(
            f"Created FAISS index with {len(self.documents)} documents."
        )

    def retrieve_context(self, query: str, k: int = 3) -> str:
        """
        Retrieves relevant context from FAISS.
        """
        if not self.index or not self.documents:
            return ""

        try:
            query_vector = self.encoder.encode([query])
            distances, indices = self.index.search(
                np.array(query_vector).astype("float32"), k
            )

            results = []
            for idx in indices[0]:
                if 0 <= idx < len(self.documents):
                    results.append(self.documents[idx])

            logger.info(f"Retrieved {len(results)} context items.")
            return "\n".join(results)

        except Exception as e:
            logger.error(f"RAG retrieval failed: {e}")
            return ""

    def get_max_similarity(self, query: str) -> float:
        """
        Returns similarity score (0–1) for confidence estimation.
        """
        if not self.index:
            return 0.0

        query_vector = self.encoder.encode([query])
        distances, _ = self.index.search(
            np.array(query_vector).astype("float32"), 1
        )

        l2_dist = distances[0][0]
        return 1 / (1 + l2_dist)


rag_service = RAGService()
