from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario, Tarefa
from config import ALLOWED_STATUSES

api = Blueprint("api", __name__)

def bad_request(msg, code=400):
    return jsonify({"error": msg}), code

@api.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@api.route("/usuarios", methods=["POST"])
def criar_usuario():
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
        senha_hash=generate_password_hash(senha)
    )
    db.session.add(usuario)
    db.session.commit()
    return jsonify({"message": "usuário criado", "usuario_id": usuario.id}), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    senha = data.get("senha")
    if not all([email, senha]):
        return bad_request("email e senha são obrigatórios")
    
    if not email([email]):
        return bad_request("email obrigatório!")
    
    if not senha([senha]):
        return bad_request("senha obrigatória!")

    usuario = Usuario.query.filter_by(email=email.strip().lower()).first()
    if not usuario or not check_password_hash(usuario.senha_hash, senha):
        return bad_request("credenciais inválidas", 401)

    # simples: devolve id/nome; se quiser JWT depois, a gente adiciona
    return jsonify({
        "message": "login ok",
        "usuario": {"id": usuario.id, "nome": usuario.nome, "email": usuario.email}
    })

@api.route("/tarefas", methods=["POST"])
def criar_tarefa():
    data = request.get_json() or {}
    titulo = data.get("titulo")
    usuario_id = data.get("usuario_id")
    status = data.get("status", "A fazer")

    if not all([titulo, usuario_id]):
        return bad_request("titulo e usuario_id são obrigatórios")

    if status not in ALLOWED_STATUSES:
        return bad_request(f"status inválido. valores: {sorted(ALLOWED_STATUSES)}")

    # valida usuário existente
    if not Usuario.query.get(usuario_id):
        return bad_request("usuario_id inexistente")

    tarefa = Tarefa(titulo=titulo.strip(), status=status, usuario_id=usuario_id)
    db.session.add(tarefa)
    db.session.commit()
    return jsonify({"message": "tarefa criada", "tarefa_id": tarefa.id}), 201


@api.route("/tarefas/usuario/<int:usuario_id>", methods=["GET"])
def listar_tarefas(usuario_id):
    tarefas = Tarefa.query.filter_by(usuario_id=usuario_id).order_by(Tarefa.id.desc()).all()
    return jsonify([{
        "id": t.id,
        "titulo": t.titulo,
        "status": t.status,
        "usuario_id": t.usuario_id
    } for t in tarefas])


@api.route("/tarefas/<int:tarefa_id>", methods=["PUT"])
def atualizar_tarefa(tarefa_id):
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


@api.route("/tarefas/<int:tarefa_id>", methods=["DELETE"])
def deletar_tarefa(tarefa_id):
    tarefa = Tarefa.query.get_or_404(tarefa_id)
    db.session.delete(tarefa)
    db.session.commit()
    return jsonify({"message": "tarefa deletada"})
