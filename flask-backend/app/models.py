from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import base64

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(UserMixin, db.Model):
    """
    User class, which contains id, username, password, fullname and the products.
    """
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.Integer)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(20))
    full_name = db.Column(db.String(100), nullable=True)
    bio = db.Column(db.String(20), default='')
    avatar = db.Column(db.LargeBinary)
    follower_count = db.Column(db.Integer, default=0)
    following_count = db.Column(db.Integer, default=0)
    active = db.Column(db.Boolean, default=False)
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')
    
    comments = db.relationship('Comment', backref='user', lazy='dynamic')
    likes = db.relationship('Like', backref='user', lazy=True)

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
    
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)
            user.follower_count += 1
            self.following_count += 1

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            user.follower_count -= 1
            self.following_count -= 1

    def is_following(self, user):
      if user is None:
          return False
      return self.followed.filter(followers.c.followed_id == user.id).count() > 0

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(500), nullable=False)
    photo_data = db.Column(db.LargeBinary)
    user_id = db.Column(db.Integer, nullable=False)
    total_likes = db.Column(db.Integer, default=0)
    
    comments = db.relationship('Comment', backref='post', lazy='dynamic')
    likes = db.relationship('Like', backref='post', lazy=True)


    def __repr__(self):
        return f"Photo('{self.caption}', '{self.photo_data}', '{self.user_id}', '{self.likes}')"

    def serialize(self):
      user = User.query.get(self.user_id)
      serialized_post = {
          'id': self.id,
          'caption': self.caption,
          'user_id': self.user_id,
          'username': user.username,
          'avatar': None,
          'likes': self.total_likes,
          'photo_data': base64.b64encode(self.photo_data).decode('utf-8')
      }
      if user.avatar is not None:
            serialized_post['avatar'] = f'{user.avatar.decode("utf-8")}'
      return serialized_post
  
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))

    def __repr__(self):
        return '<Comment {}>'.format(self.text)
    
    def serialize(self):
      user = User.query.get(self.author_id)
      serialized_post = {
          'id': self.id,
          'post_id': self.post_id,
          'commenter_id': self.author_id,
          'content': self.text,
          'commenter_username': user.username,
          'commenter_picture': None,
      }
      if user.avatar is not None:
            serialized_post['commenter_picture'] = f'{user.avatar.decode("utf-8")}'
      return serialized_post
  
class Like(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
