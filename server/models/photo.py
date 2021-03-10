from app import db
from models.base import BaseModel
from models.comment import Comment

#  * This is our photo model, it is where we create a single photo with 
#  * all the necessary data, such as captions, url etc. 

class Photo(db.Model, BaseModel):
    __tablename__ = 'photos'
    url = db.Column(db.Text, nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    caption = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=True)

    comments = db.relationship('Comment', backref='photo', cascade="all, delete")