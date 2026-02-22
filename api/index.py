import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

from routes.auth import auth_bp
from routes.user import user_bp
from routes.jobs import jobs_bp
from routes.mentors import mentors_bp
from routes.ai import ai_bp
from routes.peer import peer_bp

load_dotenv()

app = Flask(__name__, static_folder="../static")
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(user_bp, url_prefix="/api/user")
app.register_blueprint(jobs_bp, url_prefix="/api/jobs")
app.register_blueprint(mentors_bp, url_prefix="/api/mentors")
app.register_blueprint(ai_bp, url_prefix="/api/ai")
app.register_blueprint(peer_bp, url_prefix="/api/peer")

# Serve frontend
@app.route("/")
def index():
    return send_from_directory("../static", "index.html")

@app.route("/static/<path:path>")
def send_static(path):
    return send_from_directory("../static", path)
