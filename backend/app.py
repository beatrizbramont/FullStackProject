from flask import Flask
from flask_cors import CORS
from config import app, db
from routes import api_bp

app.register_blueprint(api_bp)

with app.app_context():
    db.create_all()  

if __name__ == "__main__":
    app.run(debug=True)
