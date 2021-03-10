from app import app, db
import json
from tests.lib import login

def test_get_profile():
    client = app.test_client()
    token = login(client)
    response = client.get(
        "/api/profile",
        headers= {"Authorization": f"Bearer {token}"},
    )
    assert response.json["username"] == "admin"


def test_register():
    client = app.test_client()
    register_data = {"username": "test", "email": "test@test.com", "password": "password"}
    register_response = client.post(
        "/api/signup",
        data=json.dumps(register_data),
        content_type="application/json",
    )
    assert register_response.json["username"] == "test"

def test_register_errors():
    client = app.test_client()
    register_data = {"username": "test", "email": "testtest.com", "password": "password"}
    register_response = client.post(
        "/api/signup",
        data=json.dumps(register_data),
        content_type="application/json",
    )
    assert register_response.json["errors"] == "You must have a valid email address"
    assert register_response.json["Message"] == "Generic Error"