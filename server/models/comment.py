from app import db
from models.base import BaseModel
from models.user import User

class Comment(db.Model, BaseModel):

    __tablename__ = 'comments'
    content = db.Column(db.Text, nullable=False)

    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))