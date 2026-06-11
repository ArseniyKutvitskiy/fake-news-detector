from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.schemas.analysis import AnalysisRequest, AnalysisResponse, StatisticsResponse
from app.services.analysis_service import AnalysisService

router = APIRouter(prefix="/api", tags=["Analysis"])

@router.post("/analyze", response_model=AnalysisResponse)
def analyze_text(request: AnalysisRequest, db: Session = Depends(get_db)):
    try:
        return AnalysisService.analyze_and_store(db, request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/results", response_model=List[AnalysisResponse])
def get_results(db: Session = Depends(get_db)):
    return AnalysisService.get_all_results(db)

@router.delete("/results/{result_id}")
def delete_result(result_id: int, db: Session = Depends(get_db)):
    success = AnalysisService.delete_result(db, result_id)
    if not success:
        raise HTTPException(status_code=404, detail="Запись не найдена")
    return {"message": "Успешно удалено"}

@router.get("/stats", response_model=StatisticsResponse)
def get_stats(db: Session = Depends(get_db)):
    return AnalysisService.get_statistics(db)
