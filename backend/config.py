import os

# deixe DATABASE_URL nas variáveis de ambiente, ex:
# mysql+pymysql://usuario:senha@host:3306/2manytareas
# local (fallback) caso a env não exista:
DEFAULT_LOCAL_DB = "mysql+pymysql://usuario:senha@localhost:3306/2manytareas"

ALLOWED_STATUSES = {"A fazer", "Em progresso", "Concluída", "Não concluída"}

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", DEFAULT_LOCAL_DB)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    # CORS – ajuste depois para o domínio do seu front
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
