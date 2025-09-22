from flask_sqlalchemy import SQLAlchemy
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from config import db

class Tarefa(db.Model):
    __tablename__ = "tarefa"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="A fazer")  # validação nas rotas

    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)