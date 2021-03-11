from app import db
from models.base import BaseModel
from models.user import User

#  * This is our comment model and is linked to the photo it's on and the user who wrote it

class Following(db.Model, BaseModel):

    __tablename__ = 'following'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    # user_following = db.relationship("User", backref="user_following", foreign_keys = [user_id])
    # followed_user = db.relationship("User", backref="followed", foreign_keys = [following_id])