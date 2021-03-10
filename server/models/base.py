from datetime import datetime
from app import db


# * This is our base model, all models stem from this and it has functions to save and delete 
# * an iteration of this model. 

class BaseModel:
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    def save(self):
        db.session.add(self)
        db.session.commit()
    def remove(self):
        db.session.delete(self)
        db.session.commit()