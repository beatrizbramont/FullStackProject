from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from models.usuarioModel import db, Usuario
from models.tarefaModel import Tarefa
from config import ALLOWED_STATUSES

api_bp = Blueprint("usuarios_api", __name__)

def bad_request(msg, code=400):
    return jsonify({"error": msg}), code

@api_bp.route("/estado", methods=["GET"])
def estado():
    return jsonify({"status": "ok"})

@api_bp.route("/usuarios", methods=["POST"])
def criar_usuario():
    """
    Cria um novo usuário
    ---
    tags:
      - Usuários
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Usuario
          required:
            - nome
            - email
            - senha
          properties:
            nome:
              type: string
              example: Maria Silva
            email:
              type: string
              example: maria@email.com
            senha:
              type: string
              example: senha123
    responses:
      201:
        description: Usuário criado com sucesso
      400:
        description: Dados inválidos
      409:
        description: Email já cadastrado
    """
     
    data = request.get_json() or {}
    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")

    if not all([nome, email, senha]):
        return bad_request("nome, email e senha são obrigatórios")

    if Usuario.query.filter_by(email=email).first():
        return bad_request("email já cadastrado", 409)

    usuario = Usuario(
        nome=nome.strip(),
        email=email.strip().lower(),
        senha=generate_password_hash(senha)
    )
    db.session.add(usuario)
    db.session.commit()
    return jsonify({"message": "usuário criado", "usuario_id": usuario.id}), 201

@api_bp.route("/usuarios", methods=["GET"])
def listar_usuarios():
    """
    Lista todos os usuários
    ---
    tags:
      - Usuários
    responses:
      200:
        description: Lista de usuários retornada com sucesso
        schema:
          type: array
          items:
            properties:
              id:
                type: integer
                example: 1
              nome:
                type: string
                example: Maria Silva
              email:
                type: string
                example: maria@email.com
      500:
        description: Erro interno do servidor
    """
    try:
        usuarios = Usuario.query.all()
        return jsonify([
            {
                "id": u.id,
                "nome": u.nome,
                "email": u.email
            } for u in usuarios
        ])
    except Exception as e:
        return jsonify({"error": "Erro ao buscar usuários", "details": str(e)}), 500

@api_bp.route("/usuarios/<int:id>", methods=["GET"])
def buscar_usuario(id):
    """
    Retorna os dados de um usuário
    ---
    tags:
      - Usuários
    parameters:
      - name: id
        in: path
        required: true
        type: integer
        description: ID do usuário
    responses:
      200:
        description: Dados do usuário retornados
      404:
        description: Usuário não encontrado
    """
    usuario = Usuario.query.get_or_404(id)
    return jsonify({
        "id": usuario.id,
        "nome": usuario.nome,
        "email": usuario.email
    })

@api_bp.route("/usuarios/<int:id>", methods=["PUT"])
def atualizar_usuario(id):
    """
    Atualiza dados de um usuário
    ---
    tags:
      - Usuários
    parameters:
      - name: id
        in: path
        required: true
        type: integer
        description: ID do usuário
      - name: body
        in: body
        required: true
        schema:
          id: UsuarioUpdate
          properties:
            nome:
              type: string
              example: Maria Atualizada
            senha:
              type: string
              example: novaSenha123
    responses:
      200:
        description: Usuário atualizado
      404:
        description: Usuário não encontrado
    """
    usuario = Usuario.query.get_or_404(id)
    data = request.get_json() or {}

    novo_nome = data.get("nome")
    nova_senha = data.get("senha")

    if novo_nome:
        usuario.nome = novo_nome.strip()

    if nova_senha:
        usuario.senha = generate_password_hash(nova_senha)

    db.session.commit()
    return jsonify({"message": "usuário atualizado com sucesso"})

@api_bp.route("/usuarios/<int:id>", methods=["DELETE"])
def deletar_usuario(id):
    """
    Deleta um usuário
    ---
    tags:
      - Usuários
    parameters:
      - name: id
        in: path
        required: true
        type: integer
        description: ID do usuário
    responses:
      200:
        description: Usuário deletado com sucesso
      404:
        description: Usuário não encontrado
    """
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"message": "usuário deletado com sucesso"})

