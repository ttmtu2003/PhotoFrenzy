from flask import Flask, render_template, url_for, redirect, request
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

from config import Config
import os

load_dotenv()

app = Flask(__name__)


app.config['SESSION_COOKIE_DOMAIN'] = 'localhost.localdomain' # Set the session cookie domain
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

#app.secret_key = os.getenv("SECRET_KEY")
#app.secret_key = 'youcantbrokeit'
app.config['SERVER_NAME'] = 'localhost:5000'

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

app.secret_key = "secret key"
from app.routes import *