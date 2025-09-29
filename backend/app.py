from config import app, db  
from controller.usuarioRoutes import api_bp as usuario_routes
from controller.tarefasRoutes import api_bp as tarefa_routes
from controller.authRoutes import auth_bp
from controller.frontendRoutes import frontend_bp
from sqlalchemy import inspect


app.register_blueprint(frontend_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(usuario_routes)
app.register_blueprint(tarefa_routes)

with app.app_context():
    db.create_all()  

if __name__ == "__main__":
    app.run(host=app.config["HOST"], port=app.config["PORT"], debug=app.config["DEBUG"])
