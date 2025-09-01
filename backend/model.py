from flask_sqlalchemy import SQLAlchemy
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from config import db

class Usuario(db.Model):
    __tablename__ = "usuario"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    senha = db.Column(db.String(255), nullable=False)

    tarefas = db.relationship("Tarefa", backref="usuario", lazy=True, cascade="all, delete-orphan")

class Tarefa(db.Model):
    __tablename__ = "tarefa"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    titulo = db.Column(db.String(200), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="A fazer")  # validação nas rotas

    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
