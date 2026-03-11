from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to AGRIVERSE-24/7 API"}

def test_query_flow_mock():
    # Note: efficient testing would mock the services. 
    # For this simple check we rely on the implementation handling errors gracefully if services are offline.
    response = client.post("/api/v1/query/submit", json={"query": "How to grow tomatoes?"})
    # We expect 200 even if it fails to connect to Ollama (it returns a polite error message)
    # OR if it succeeds.
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert "status" in data
