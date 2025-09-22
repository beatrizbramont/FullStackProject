from flask import request, jsonify, Blueprint, session
from werkzeug.security import check_password_hash
from models.usuarioModel import Usuario
from config import db  
from flasgger import swag_from

auth_bp = Blueprint("auth_api", __name__)

def bad_request(msg, code=400):
    return jsonify({"error": msg}), code

@auth_bp.route("/login", methods=["POST"])
@swag_from({
    'tags': ['Autenticação'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'id': 'Login',
                'required': ['email', 'senha'],
                'properties': {
                    'email': {'type': 'string', 'example': 'maria@email.com'},
                    'senha': {'type': 'string', 'example': 'senha123'}
                }
            }
        }
    ],
    'responses': {
        200: {'description': 'Login realizado com sucesso'},
        400: {'description': 'Email e senha são obrigatórios'},
        401: {'description': 'Credenciais inválidas'}
    }
})
def login():
    data = request.get_json() or {}
    email = data.get("email")
    senha = data.get("senha")

    if not all([email, senha]):
        return bad_request("email e senha são obrigatórios")

    usuario = Usuario.query.filter_by(email=email.strip().lower()).first()
    if not usuario or not check_password_hash(usuario.senha, senha):
        return bad_request("credenciais inválidas", 401)

    # Exemplo simples de sessão Flask para login (ajuste conforme seu método de auth)
    session['usuario_id'] = usuario.id
    session['usuario_nome'] = usuario.nome

    return jsonify({
        "message": "login ok",
        "usuario": {"id": usuario.id, "nome": usuario.nome, "email": usuario.email}
    })


@auth_bp.route("/logout", methods=["POST"])
@swag_from({
    'tags': ['Autenticação'],
    'responses': {
        200: {'description': 'Logout realizado com sucesso'}
    }
})
def logout():
    session.clear()
    return jsonify({"message": "logout realizado com sucesso"})
