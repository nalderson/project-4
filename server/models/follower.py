from app import db
from models.base import BaseModel
from models.user import User

#  * This is our comment model and is linked to the photo it's on and the user who wrote it

class Follower(db.Model, BaseModel):

    __tablename__ = 'follower'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    user_following = db.relationship("User", backref="follower", foreign_keys = [user_id])
    following_user = db.relationship("User", backref="following_user", foreign_keys = [follower_id])