from app import db
from models.base import BaseModel
from models.user import User

#  * This is our comment model and is linked to the photo it's on and the user who wrote it

class Following(db.Model, BaseModel):

    __tablename__ = 'following'
    content = db.Column(db.Text, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    following = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))