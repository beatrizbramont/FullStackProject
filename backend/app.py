from config import app, db  
from controller.usuarioRoutes import api_bp as usuario_routes
from controller.tarefasRoutes import api_bp as tarefa_routes
from controller.authRoutes import auth_bp
from sqlalchemy import inspect
from flask_cors import CORS

CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://10.53.212.55:3000"], supports_credentials=True)

app.register_blueprint(auth_bp)
app.register_blueprint(usuario_routes)
app.register_blueprint(tarefa_routes)

with app.app_context():
    db.create_all()  

if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug=app.config["DEBUG"])
