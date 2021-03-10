from flask import Blueprint, request, g
from models.user import User
from models.comment import Comment
from serializers.user import UserSchema
from serializers.comment import CommentSchema
from decorators.secure_route import secure_route
from marshmallow.exceptions import ValidationError

router = Blueprint(__name__, "comments")

@router.route("/comments", methods=["GET"])
def get_comments():
    comments = Comment.query.all()
    return CommentSchema.jsonify(comments, many=True), 200

@router.route("/comments/<int:comment_id>", methods=["GET"])
def get_single_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return {"message": "Comment not found for single comment."}, 404

    return CommentSchema.jsonify(comment), 200

@router.route("/comments", methods=["POST"])
@secure_route
def post_comment():
    comment_dictionary = request.json

    try:
        comment = CommentSchema.load(comment_dictionary)
        comment.user = g.current_user

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong!"}

    comment.save()

    return CommentSchema.jsonify(comment), 200

@router.route("/comments/<int:comment_id>", methods=["DELETE"])
@secure_route
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment.user != g.current_user:
        return {'errors': 'This is not your comment!'}, 402

    comment.remove()

    return {"message": "Comment deleted successfully!"}, 200

@router.route("/comments/<int:comment_id>", methods=["PUT"])
@secure_route
def update_comment(comment_id):
    existing_comment = Comment.query.get(comment_id)
    comment_dictionary = request.json

    try:
        comment = CommentSchema.load(
            comment_dictionary,
            instance=existing_comment,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong!"}

    comment.save()

    return CommentSchema.jsonify(comment), 201


