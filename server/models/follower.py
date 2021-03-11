from app import db
from models.base import BaseModel
from models.user import User

#  * This is our comment model and is linked to the photo it's on and the user who wrote it

class Follower(db.Model, BaseModel):

    __tablename__ = 'follower'
    content = db.Column(db.Text, nullable=False)
    
    