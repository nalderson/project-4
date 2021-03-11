from app import app, db
from data.photo_data import list_photos
from data.user_data import list_users
from models.following import Following
from data.comment_data import list_comment

with app.app_context():

    try:
        db.drop_all()

        db.create_all()

        # ! Add some users
        db.session.add_all(list_users)

        db.session.commit()

        db.session.add_all(list_photos)

        following_one = Following(user_id=1, following_id=2)

        db.session.add(following_one)

        db.session.commit()

        db.session.add_all(list_comment)

        db.session.commit()

        print("Everything committed 🤖")
    except Exception as e:
        print("There was an error.")
        print(e)