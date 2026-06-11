from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analysis
from app.database.database import engine, Base

# Создание таблиц при запуске
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fake News Detector API", version="1.0.0")

# Настройка CORS для работы с React фронтендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis.router)

@app.get("/")
def read_root():
    return {"message": "Fake News Detector API успешно запущен!"}
