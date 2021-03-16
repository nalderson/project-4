from flask import Blueprint, request, g
from models.photo import Photo
from models.comment import Comment
from serializers.photo import PhotoSchema
from decorators.secure_route import secure_route
from serializers.comment import CommentSchema
from marshmallow.exceptions import ValidationError
photo_schema = PhotoSchema()
comment_schema = CommentSchema()
# * These are our photo controllers, they give access to the API through routes, such as 'get all photos', 'get single photo' etc

router = Blueprint(__name__, "photos")

@router.route("/photos", methods=["GET"])
def get_photos():
    photos = Photo.query.all()

    return photo_schema.jsonify(photos, many=True), 200

@router.route("/photos/<int:photo_id>", methods=["GET"])
def get_single_photo(photo_id):
    photo = Photo.query.get(photo_id)

    if not photo:
        return {"message": "Photo not found for single photo."}, 404

    return photo_schema.jsonify(photo), 200

@router.route("/photos", methods=["POST"])
@secure_route
def upload_photo():
    photo_dictionary = request.json

    try:
        photo = photo_schema.load(photo_dictionary)

        photo.user = g.current_user

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong!"}

    photo.save()

    return photo_schema.jsonify(photo), 200

@router.route("/photos/<int:photo_id>", methods=["DELETE"])
@secure_route
def remove_photo(photo_id):
    photo = Photo.query.get(photo_id)

    if photo.user != g.current_user:
        return {'errors': 'This is not your photo!'}, 402

    photo.remove()

    return {"message": "Photo deleted successfully!"}, 200

@router.route("/photos/<int:photo_id>", methods=["PUT"])
@secure_route
def update_photo(photo_id):
    existing_photo = Photo.query.get(photo_id)
    photo_dictionary = request.json

    try:
        photo = photo_schema.load(
            photo_dictionary,
            instance=existing_photo,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong!"}

    photo.save()

    return photo_schema.jsonify(photo), 201


# ! Comment Routes go below

@router.route("/photos/<int:photo_id>/comments", methods=["POST"])
@secure_route
def create_comment(photo_id):
    comment_dictionary = request.json

    photo = Photo.query.get(photo_id)

    try:
        comment = comment_schema.load(comment_dictionary)

        comment.photo = photo
        comment.user = g.current_user

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    comment.save()

    return photo_schema.jsonify(photo)



@router.route("/photos/<int:photo_id>/comments/<int:comment_id>", methods=["DELETE"])
@secure_route
def remove_comment(photo_id, comment_id):

    comment = Comment.query.get(comment_id)

    comment.remove()

    photo = Photo.query.get(photo_id)

    return photo_schema.jsonify(photo), 202


@router.route("/photos/<int:photo_id>/comments/<int:comment_id>", methods=["PUT"])
@secure_route
def update_comment(photo_id, comment_id):
    existing_comment = Comment.query.get(comment_id)
    comment_dictionary = request.json

    try:
        comment = comment_schema.load(
            comment_dictionary,
            instance=existing_comment,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong!"}

    comment.save()

    photo = Photo.query.get(photo_id)

    return photo_schema.jsonify(photo), 202
