from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from serializers.follower import FollowerSchema
from serializers.following import FollowingSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route


#  * These are our user controllers, sign up, login and get single user profile

user_schema = UserSchema()
follower_schema = FollowerSchema()
following_schema = FollowingSchema()

router = Blueprint(__name__, "users")

@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }

    user.save()

    return user_schema.jsonify(user)


@router.route('/login', methods=['POST'])
def login():

    user = User.query.filter_by(email=request.json['email']).first()

    if not user:
        return { 'message': 'No user found for this email.' }

    if not user.validate_password(request.json['password']):
        return { 'message' : 'Unauthorized.' }, 402

    token = user.generate_token()

    return { 'token': token, 'message': 'Welcome back!' }


@router.route('/profile', methods=['GET'])
@secure_route
def get_user_profile():
    return user_schema.jsonify(g.current_user)

@router.route('/follow/<int:other_user_id>', methods=['GET'])
@secure_route
def add_follower(following_id):
    following = User.query.get(following_id)
    follower = g.current_user
    try:
      new_follower = follower_schema.load()
      new_follower.follower = follower
      new_follower.following = following
      new_following = following_schema.load()
      new_following.follower = follower
      new_following.following = following
    except ValidationError as e:
      return {"errors": e.messages, "messages": "Something went wrong adding a follower"}
    new_follower.save()
    new_following.save()

    return "New follower added!"
    