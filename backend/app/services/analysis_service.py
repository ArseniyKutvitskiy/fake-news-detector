from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.analysis import AnalysisResult
from app.schemas.analysis import AnalysisRequest
from app.ai.model import ai_detector

class AnalysisService:
    @staticmethod
    def analyze_and_store(db: Session, request: AnalysisRequest):
        # 1. Анализ с помощью ИИ модели
        ai_result = ai_detector.predict(request.text)
        
        # 2. Сохранение в базу данных
        db_record = AnalysisResult(
            input_text=request.text,
            prediction=ai_result["prediction"],
            confidence=ai_result["confidence"]
        )
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        
        return db_record

    @staticmethod
    def get_all_results(db: Session):
        return db.query(AnalysisResult).order_by(AnalysisResult.created_at.desc()).all()

    @staticmethod
    def delete_result(db: Session, result_id: int):
        record = db.query(AnalysisResult).filter(AnalysisResult.id == result_id).first()
        if record:
            db.delete(record)
            db.commit()
            return True
        return False

    @staticmethod
    def get_statistics(db: Session):
        total = db.query(AnalysisResult).count()
        fake = db.query(AnalysisResult).filter(AnalysisResult.prediction == "Fake").count()
        real = total - fake
        
        avg_conf = db.query(func.avg(AnalysisResult.confidence)).scalar()
        avg_conf = round(avg_conf, 4) if avg_conf else 0.0

        return {
            "total_checks": total,
            "fake_count": fake,
            "real_count": real,
            "average_confidence": avg_conf
        }
