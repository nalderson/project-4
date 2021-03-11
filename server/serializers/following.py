from app import ma
from models.following import Following
from marshmallow import fields
from serializers.user import UserSchema

class FollowingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Following
        load_instance = True
    # user_following = fields.nested("UserSchema")
    # followed_user = fields.nested("UserSchema")
    # user_id = fields.Integer()
    # following_id = fields.Integer()