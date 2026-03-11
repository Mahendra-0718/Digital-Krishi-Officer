# API Contract

## POST /api/v1/query/submit
**Request**:
```json
{
  "query": "How to treat potato blight?",
  "language": "en"
}
```
**Response**:
```json
{
  "response": "Use fungicides...",
  "original_query": "How to treat potato blight?",
  "detected_language": "en",
  "confidence": 0.95,
  "status": "success"
}
```

## POST /api/v1/image/analyze
**Request**: Multipart form-data with `file` field.
**Response**: JSON with analysis string.

## POST /api/v1/feedback/submit
**Request**:
```json
{
  "interaction_id": 1,
  "rating": 5,
  "comment": "Good advice"
}
```
