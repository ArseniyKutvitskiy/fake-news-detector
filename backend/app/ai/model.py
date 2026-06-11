from transformers import pipeline

class FakeNewsModel:
    def __init__(self):
        print("Загрузка AI модели: hamzab/roberta-fake-news-classification...")
        # Настоящая интеграция AI: Использование модели RoBERTa, дообученной для классификации фейков
        self.classifier = pipeline(
            "text-classification", 
            model="hamzab/roberta-fake-news-classification",
            truncation=True,
            max_length=512
        )
        print("AI модель успешно загружена.")

    def predict(self, text: str) -> dict:
        result = self.classifier(text)[0]
        label_raw = result['label'].upper()
        score = result['score']

        # Маппинг ответов модели под наши стандарты
        prediction = "Fake" if "FAKE" in label_raw else "Real"

        return {
            "prediction": prediction,
            "confidence": round(score, 4)
        }

# Синглтон, чтобы модель не инициализировалась заново при каждом запросе
ai_detector = FakeNewsModel()
