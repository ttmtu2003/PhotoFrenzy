from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    """
    User class, which contains id, username, password, fullname and the products.
    """
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.Integer)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(20))
    full_name = db.Column(db.String(100), nullable=True)
    active = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<User %r>' % self.username

    @property
    def is_active(self):
        return self.active

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password, method='scrypt')

    def verify_password(self, password):
        if self.password_hash is None:
            return False
        return check_password_hash(self.password_hash, password)