from pydantic import BaseModel, Field
from datetime import datetime

class AnalysisRequest(BaseModel):
    text: str = Field(..., min_length=10, description="Текст новости для анализа")

class AnalysisResponse(BaseModel):
    id: int
    input_text: str
    prediction: str
    confidence: float
    created_at: datetime

    class Config:
        from_attributes = True

class StatisticsResponse(BaseModel):
    total_checks: int
    fake_count: int
    real_count: int
    average_confidence: float
