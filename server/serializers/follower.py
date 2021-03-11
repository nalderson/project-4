from app import ma
from models.follower import Follower
from marshmallow import fields
from serializers.user import UserSchema

class FollowerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Follower
        load_instance = True
    # user_following = fields.nested("UserSchema")
    # following_user = fields.nested("UserSchema")
    # user_id = fields.Integer()
    # follower_id = fields.Integer()