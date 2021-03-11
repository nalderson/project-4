from app import app, db
from data.photo_data import list_photos
from data.user_data import list_users
from data.following_data import list_following
from data.comment_data import list_comment

with app.app_context():

    try:
        db.drop_all()

        db.create_all()

        # ! Add some users
        db.session.add_all(list_users)

        db.session.commit()

        db.session.add_all(list_photos)

        db.session.commit()

        db.session.add_all(list_comment)

        db.session.commit()

        db.session.add_all(list_following)

        db.session.commit()

        print("Everything committed 🤖")
    except Exception as e:
        print("There was an error.")
        print(e)