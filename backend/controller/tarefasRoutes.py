from flask import request, jsonify, Blueprint
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
    """
    Cria uma nova tarefa para um usuário
    ---
    tags:
      - Tarefas
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Tarefa
          required:
            - titulo
            - usuario_id
          properties:
            titulo:
              type: string
              example: Estudar Flask
            descricao:
              type: string
              example: Ler documentação oficial do Flask
            status:
              type: string
              example: A fazer
            usuario_id:
              type: integer
              example: 1
    responses:
      201:
        description: Tarefa criada com sucesso
      400:
        description: Dados inválidos
    """
    data = request.get_json() or {}
    titulo = data.get("titulo")
    usuario_id = data.get("usuario_id")
    status = data.get("status", "A fazer")

    if not all([titulo, usuario_id]):
        return bad_request("titulo e usuario_id são obrigatórios")

    if status not in ALLOWED_STATUSES:
        return bad_request(f"status inválido. valores: {sorted(ALLOWED_STATUSES)}")

    if not Usuario.query.get(usuario_id):
        return bad_request("usuario_id inexistente")

    tarefa = Tarefa(titulo=titulo.strip(), status=status, usuario_id=usuario_id)
    db.session.add(tarefa)
    db.session.commit()
    return jsonify({"message": "tarefa criada", "tarefa_id": tarefa.id}), 201


@api_bp.route("/tarefas/usuario/<int:usuario_id>", methods=["GET"])
def listar_tarefas(usuario_id):
    """
    Lista todas as tarefas de um usuário
    ---
    tags:
      - Tarefas
    parameters:
      - name: usuario_id
        in: path
        type: integer
        required: true
        description: ID do usuário
    responses:
      200:
        description: Lista de tarefas
    """
    tarefas = Tarefa.query.filter_by(usuario_id=usuario_id).order_by(Tarefa.id.desc()).all()
    return jsonify([{
        "id": t.id,
        "titulo": t.titulo,
        "status": t.status,
        "usuario_id": t.usuario_id
    } for t in tarefas])


@api_bp.route("/tarefas/<int:tarefa_id>", methods=["PUT"])
def atualizar_tarefa(tarefa_id):
    """
    Atualiza os dados de uma tarefa
    ---
    tags:
      - Tarefas
    parameters:
      - name: tarefa_id
        in: path
        type: integer
        required: true
        description: ID da tarefa
      - name: body
        in: body
        required: true
        schema:
          properties:
            titulo:
              type: string
              example: Nova tarefa
            descricao:
              type: string
              example: Descrição atualizada
            status:
              type: string
              example: Em andamento
    responses:
      200:
        description: Tarefa atualizada
      400:
        description: Dados inválidos
      404:
        description: Tarefa não encontrada
    """
    data = request.get_json() or {}
    tarefa = Tarefa.query.get_or_404(tarefa_id)

    novo_titulo = data.get("titulo")
    novo_status = data.get("status")

    if novo_titulo is not None:
        tarefa.titulo = novo_titulo.strip() or tarefa.titulo

    if novo_status is not None:
        if novo_status not in ALLOWED_STATUSES:
            return bad_request(f"status inválido. valores: {sorted(ALLOWED_STATUSES)}")
        tarefa.status = novo_status

    db.session.commit()
    return jsonify({"message": "tarefa atualizada"})


@api_bp.route("/tarefas/<int:tarefa_id>", methods=["DELETE"])
def deletar_tarefa(tarefa_id):
    """
    Deleta uma tarefa pelo ID
    ---
    tags:
      - Tarefas
    parameters:
      - name: tarefa_id
        in: path
        type: integer
        required: true
        description: ID da tarefa a ser deletada
    responses:
      200:
        description: Tarefa deletada com sucesso
      404:
        description: Tarefa não encontrada
    """
    tarefa = Tarefa.query.get_or_404(tarefa_id)
    db.session.delete(tarefa)
    db.session.commit()
    return jsonify({"message": "tarefa deletada"})
