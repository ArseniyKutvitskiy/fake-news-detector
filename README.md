# 🕵️‍♂️ AI Fake News Detector

## 📖 Описание проекта

AI Fake News Detector — интеллектуальное веб-приложение для автоматического определения достоверности новостных статей с использованием модели искусственного интеллекта RoBERTa.

## 🚀 Основные возможности

- Анализ новостных текстов с помощью ИИ
- Определение вероятности фейка
- Сохранение результатов в PostgreSQL
- История всех проверок
- Статистика использования
- Современный интерфейс на React
- REST API на FastAPI

---

## 🏗 Архитектура проекта

```text
React (Frontend)
      ↓
FastAPI (Backend)
      ↓
RoBERTa AI + PostgreSQL
```

## 📂 Структура проекта

```text
fake-news-detector/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

## ⚙️ Установка Backend

```bash
cd backend

python -m venv venv

.\venv\Scripts\activate

pip install -r requirements.txt
```

## 🗄 Настройка БД

Создайте файл `.env`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_FS2lMszVkZW5@ep-floral-bonus-ajesitho.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## ▶️ Запуск Backend

```bash
uvicorn app.main:app --reload
```

Swagger:

```text
http://localhost:8000/docs
```

## 🎨 Запуск Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 🤖 Используемая AI-модель

RoBERTa используется для бинарной классификации новостей:

- REAL NEWS
- FAKE NEWS

Пример ответа:

```json
{
  "prediction": "FAKE",
  "confidence": 0.94
}
```

## 🎓 Проект

Проект демонстрирует навыки:

- Full Stack Development
- FastAPI
- React
- PostgreSQL
- Machine Learning
- Artificial Intelligence

## 👨‍💻 Автор

Arseniy Kutvitskiy