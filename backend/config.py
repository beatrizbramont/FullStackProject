# config.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flasgger import Swagger

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "chave_secreta")

app.config['HOST'] = '0.0.0.0'
app.config['PORT'] = 8001
app.config['DEBUG'] = True

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///app.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SWAGGER'] = {
    'title': 'Minha API de Tarefas',
    'uiversion': 3
}

swagger = Swagger(app)
ALLOWED_STATUSES = {"A fazer", "Em andamento", "Concluído", "Aguardando"}

db = SQLAlchemy(app)
