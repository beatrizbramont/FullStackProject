from flask import Flask
from flask_cors import CORS
from model import db
from config import Config
from route import api

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGINS}})

    app.register_blueprint(api)

    @app.shell_context_processor
    def _ctx():
        return {"db": db}

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
