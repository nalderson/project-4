from app import ma
from models.photo import Photo
from marshmallow import fields

class PhotoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Photo
        load_instance = True
    user = fields.Nested('SimpleUserSchema')
    comments = fields.Nested("CommentSchema", many=True)