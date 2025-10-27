from flask import request, jsonify, Blueprint
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from models.usuarioModel import db, Usuario
from models.tarefaModel import Tarefa
from config import ALLOWED_STATUSES

api_bp = Blueprint("tarefas_api", __name__)

def bad_request(msg, code=400):
    return jsonify({"error": msg}), code

@api_bp.route("/estado", methods=["GET"])
def estado():
    return jsonify({"status": "ok"})

@api_bp.route("/tarefas", methods=["POST"])
def criar_tarefa():
    data = request.get_json() or {}
    titulo = data.get("titulo")
    usuario_id = data.get("usuario_id")
    descricao = data.get("descricao", "").strip()
    status = data.get("status", "A fazer")

    if not all([titulo, usuario_id]):
        return bad_request("titulo e usuario_id são obrigatórios")
    if status not in ALLOWED_STATUSES:
        return bad_request(f"status inválido. valores: {sorted(ALLOWED_STATUSES)}")
    if not Usuario.query.get(usuario_id):
        return bad_request("usuario_id inexistente")

    start_date_str = data.get("startDate")
    end_date_str = data.get("endDate")

    # converte para datetime.date aceitando qualquer ISO
    start_date = None
    end_date = None
    try:
        if start_date_str:
            start_date = datetime.datetime.fromisoformat(start_date_str).date()
        if end_date_str:
            end_date = datetime.datetime.fromisoformat(end_date_str).date()
    except ValueError:
        return bad_request("startDate ou endDate inválidos. Use formato YYYY-MM-DD ou ISO válido")

    tarefa = Tarefa(
        titulo=titulo.strip(),
        descricao=descricao,
        status=status,
        usuario_id=usuario_id,
        start_date=start_date,
        end_date=end_date
    )

    db.session.add(tarefa)
    db.session.commit()

    return jsonify({
        "message": "tarefa criada",
        "tarefa": {
            "id": tarefa.id,
            "titulo": tarefa.titulo,
            "descricao": tarefa.descricao,
            "status": tarefa.status,
            "usuario_id": tarefa.usuario_id,
            "startDate": tarefa.start_date.isoformat() if tarefa.start_date else None,
            "endDate": tarefa.end_date.isoformat() if tarefa.end_date else None
        }
    }), 201

# ---------- LISTAR TAREFAS DE UM USUÁRIO ----------
@api_bp.route("/tarefas/usuario/<int:usuario_id>", methods=["GET"])
def listar_tarefas(usuario_id):
    tarefas = Tarefa.query.filter_by(usuario_id=usuario_id).order_by(Tarefa.id.desc()).all()
    return jsonify([
        {
            "id": t.id,
            "titulo": t.titulo,
            "descricao": t.descricao,
            "status": t.status,
            "usuario_id": t.usuario_id,
            "startDate": t.start_date.isoformat() if t.start_date else None,
            "endDate": t.end_date.isoformat() if t.end_date else None
        } for t in tarefas
    ])

# ---------- ATUALIZAR TAREFA ----------
@api_bp.route("/tarefas/<int:tarefa_id>", methods=["PUT"])
def atualizar_tarefa(tarefa_id):
    data = request.get_json() or {}
    tarefa = Tarefa.query.get_or_404(tarefa_id)

    novo_titulo = data.get("titulo")
    nova_descricao = data.get("descricao")
    novo_status = data.get("status")
    novo_start_date_str = data.get("startDate")
    novo_end_date_str = data.get("endDate")

    if novo_start_date_str is not None:
        try:
            tarefa.start_date = datetime.datetime.strptime(novo_start_date_str, "%Y-%m-%d").date()
        except ValueError:
            return bad_request("startDate inválido. Use formato YYYY-MM-DD")
    if novo_end_date_str is not None:
        try:
            tarefa.end_date = datetime.datetime.strptime(novo_end_date_str, "%Y-%m-%d").date()
        except ValueError:
            return bad_request("endDate inválido. Use formato YYYY-MM-DD")

    if novo_titulo is not None:
        tarefa.titulo = novo_titulo.strip() or tarefa.titulo
    if nova_descricao is not None:
        tarefa.descricao = nova_descricao.strip() or tarefa.descricao
    if novo_status is not None:
        if novo_status not in ALLOWED_STATUSES:
            return bad_request(f"status inválido. valores: {sorted(ALLOWED_STATUSES)}")
        tarefa.status = novo_status

    db.session.commit()
    return jsonify({
        "message": "tarefa atualizada",
        "tarefa": {
            "id": tarefa.id,
            "titulo": tarefa.titulo,
            "descricao": tarefa.descricao,
            "status": tarefa.status,
            "usuario_id": tarefa.usuario_id,
            "startDate": tarefa.start_date.isoformat() if tarefa.start_date else None,
            "endDate": tarefa.end_date.isoformat() if tarefa.end_date else None
        }
    })

# ---------- DELETAR TAREFA ----------
@api_bp.route("/tarefas/<int:tarefa_id>", methods=["DELETE"])
def deletar_tarefa(tarefa_id):
    tarefa = Tarefa.query.get_or_404(tarefa_id)
    db.session.delete(tarefa)
    db.session.commit()
    return jsonify({"message": "tarefa deletada"})
