# authRoutes.py
from flask import request, jsonify, Blueprint, session
from werkzeug.security import generate_password_hash, check_password_hash
from models.usuarioModel import db, Usuario

auth_bp = Blueprint("auth_api", __name__)

def bad_request(msg, code=400):
    return jsonify({"error": msg}), code


@auth_bp.route("/cadastro", methods=["POST"])
def cadastro():
    """
    Cadastra um novo usuário
    ---
    tags:
      - Autenticação
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Cadastro
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
        description: Usuário cadastrado com sucesso
        schema:
          properties:
            message: { type: string, example: Usuário cadastrado com sucesso }
            usuario:
              type: object
              properties:
                id: { type: integer, example: 1 }
                nome: { type: string, example: Maria Silva }
                email: { type: string, example: maria@email.com }
      400:
        description: nome, email e senha são obrigatórios
      409:
        description: email já cadastrado
    """
    data = request.get_json() or {}
    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")

    if not all([nome, email, senha]):
        return bad_request("nome, email e senha são obrigatórios")

    email_norm = email.strip().lower()
    if Usuario.query.filter_by(email=email_norm).first():
        return bad_request("email já cadastrado", 409)

    senha_hash = generate_password_hash(senha)
    novo_usuario = Usuario(
        nome=nome.strip(),
        email=email_norm,
        senha=senha_hash
    )
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({
        "message": "Usuário cadastrado com sucesso",
        "usuario": {
            "id": novo_usuario.id,
            "nome": novo_usuario.nome,
            "email": novo_usuario.email
        }
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Realiza login do usuário (usa sessão Flask)
    ---
    tags:
      - Autenticação
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Login
          required:
            - email
            - senha
          properties:
            email:
              type: string
              example: maria@email.com
            senha:
              type: string
              example: senha123
    responses:
      200:
        description: Login realizado com sucesso
        schema:
          properties:
            message: { type: string, example: login ok }
            usuario:
              type: object
              properties:
                id: { type: integer, example: 1 }
                nome: { type: string, example: Maria Silva }
                email: { type: string, example: maria@email.com }
      400:
        description: email e senha são obrigatórios
      401:
        description: credenciais inválidas
    """
    data = request.get_json() or {}
    email = data.get("email")
    senha = data.get("senha")

    if not all([email, senha]):
        return bad_request("email e senha são obrigatórios")

    email_norm = email.strip().lower()
    usuario = Usuario.query.filter_by(email=email_norm).first()
    if not usuario or not check_password_hash(usuario.senha, senha):
        return bad_request("credenciais inválidas", 401)

    # simples sessão Flask (substituir por JWT/Flask-Login em produção)
    session.clear()
    session['usuario_id'] = usuario.id
    session['usuario_nome'] = usuario.nome

    return jsonify({
        "message": "login ok",
        "usuario": {
            "id": usuario.id,
            "nome": usuario.nome,
            "email": usuario.email
        }
    }), 200


@auth_bp.route("/logout", methods=["POST"])
def logout():
    """
    Faz logout (limpa a sessão)
    ---
    tags:
      - Autenticação
    responses:
      200:
        description: Logout realizado com sucesso
        schema:
          properties:
            message: { type: string, example: logout realizado com sucesso }
    """
    session.clear()
    return jsonify({"message": "logout realizado com sucesso"}), 200
