from app import ma
from models.follower import Follower
from marshmallow import fields

class FollowerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Follower
        load_instance = True
  