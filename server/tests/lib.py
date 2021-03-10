from app import app, db
from data.photo_data import list_photos
from data.user_data import list_users
import json

def login(client):
    login_data = {"password": "admin", "email": "admin@admin.com"}
    login_response = client.post(
        "/api/login", data=json.dumps(login_data), content_type="application/json"
    )
    assert len(login_response.json["token"]) != 0
    return login_response.json["token"]

def setup_db():
    with app.app_context():
        try:
            db.drop_all()
            db.create_all()
            db.session.add_all(list_users)
            db.session.commit()
            db.session.add_all(list_photos)
            db.session.commit()
            
            print('Everything committed')
        except Exception as e:
            print('There was an error:')
            print(e)