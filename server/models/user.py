from app import db, bcrypt
from models.base import BaseModel
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
import jwt
from datetime import *
from config.environment import secret
from models.follow_table import Following

# * This is our user model including methods to set, encode, and verify password

class User(db.Model, BaseModel):

    __tablename__ = 'users'
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    profile_picture = db.Column(db.Text, nullable=False)
 
    comments = db.relationship('Comment', backref='user', cascade='all, delete')
    photos = db.relationship('Photo', backref='user', cascade='all, delete')

    following_current_user = db.relationship('Following', backref='following_current_user', foreign_keys = 'Following.following_current_user_id')
    following_users = db.relationship('Following', backref='following_user', foreign_keys = 'Following.following_user_id ')
    
    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode('utf-8')

    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address, "You must have a valid email address"
        return address
    
    def validate_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)


    def generate_token(self):
        payload = {
            "sub": self.id,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(days=1)
        }

        token = jwt.encode(payload, secret, 'HS256')
        return token


