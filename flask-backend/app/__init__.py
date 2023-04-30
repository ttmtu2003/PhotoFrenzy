from flask import Flask, render_template, url_for, redirect, request
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

from config import Config
import os

load_dotenv()

app = Flask(__name__)
db = SQLAlchemy(app)

app.config['SESSION_COOKIE_DOMAIN'] = 'localhost.localdomain' # Set the session cookie domain

app.config.from_object(Config)

#app.secret_key = os.getenv("SECRET_KEY")
#app.secret_key = 'youcantbrokeit'
app.config['SERVER_NAME'] = 'localhost:5000'

app.secret_key = "secret key"
from app.routes import *