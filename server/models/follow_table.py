from app import db
from models.base import BaseModel

class Following(db.Model, BaseModel):

    __tablename__ = "following"

    following_current_user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    following_user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))

