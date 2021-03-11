from app import ma
from models.follow_table import Following
from marshmallow import fields

class FollowingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Following
        load_instance = True