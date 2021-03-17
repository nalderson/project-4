from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from serializers.follow_table import FollowingSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route
from models.follow_table import Following


#  * These are our user controllers, sign up, login and get single user profile

user_schema = UserSchema()
following_schema = FollowingSchema()


router = Blueprint(__name__, "users")


@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return {'errors': e.messages, 'messages': 'Something went wrong.'}

    user.save()

    return user_schema.jsonify(user)


@router.route('/login', methods=['POST'])
def login():

    user = User.query.filter_by(email=request.json['email']).first()

    if not user:
        return {'message': 'No user found for this email.'}

    if not user.validate_password(request.json['password']):
        return {'message': 'Unauthorized.'}, 402

    token = user.generate_token()

    return {'token': token, 'message': 'Welcome back!'}


@router.route('/profile', methods=['GET'])
@secure_route
def get_user_profile():
    return user_schema.jsonify(g.current_user)


@router.route('/profile', methods=['DELETE'])
@secure_route
def delete_user_profile():

    user = User.query.get(g.current_user.id)
    try:
        user.remove()
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}, 400

    return {"message": "User profile deleted"}, 200


@router.route('/profile/<int:user_id>', methods=['GET'])
def get_a_profile(user_id):
    user = User.query.get(user_id)

    if not user:
        return {"message": "This user has not been found"}, 404

    return user_schema.jsonify(user), 200


@router.route('/profile/<int:user_id>', methods=['POST'])
@secure_route
def add_a_follower(user_id):

    follow = Following(
        following_current_user_id=g.current_user.id, following_user_id=user_id)
    follow.save()

    return "Well done, you made a new friend"


@router.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200


@router.route('/profile/<int:user_id>', methods=['PUT'])
@secure_route
def update_user(user_id):
    unchanged_user = User.query.get(user_id)
    user_dictionary = request.json
    try:
        user = user_schema.load(
            user_dictionary,
            instance=unchanged_user,
            partial=True,
        )
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    user.save()

    return user_schema.jsonify(user), 201
