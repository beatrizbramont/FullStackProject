from flask_sqlalchemy import SQLAlchemy
import sys
import os,datetime
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from config import db

class Tarefa(db.Model):
    __tablename__ = "tarefa"
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    status = db.Column(db.String(50), nullable=False, default="A fazer")
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)

def to_dict(self):
    return {
        "id": self.id,
        "titulo": self.titulo,
        "descricao": self.descricao,
        "status": self.status,
        "usuario_id": self.usuario_id,
        "startDate": self.start_date.isoformat() if isinstance(self.start_date, (datetime.date, datetime.datetime)) else self.start_date,
        "endDate": self.end_date.isoformat() if isinstance(self.end_date, (datetime.date, datetime.datetime)) else self.end_date
    }


