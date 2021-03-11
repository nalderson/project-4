from app import app, db
import json
from tests.lib import login

def test_create_comment():
    client = app.test_client()
    token = login(client)
    comment_data = {"content": "testing create comment"}
    request_headers = {"Authorization": f"Bearer {token}"}
    comment_response = client.post(
        "/api/photos/1/comments",
        data=json.dumps(comment_data),
        content_type="application/json",
        headers=request_headers,
    )
    assert comment_response.json["content"] == "testing create comment"


def test_remove_comment():
    client = app.test_client()
    token = login(client)
    request_headers = {"Authorization": f"Bearer {token}"}
    delete_comment_response = client.delete(
        "/api/photos/1/comments/1",
        headers=request_headers,
    )
    assert delete_comment_response.json["id"] == 1


def test_update_comment():
    client = app.test_client()
    token = login(client)
    comment_data = {"content": "I've changed the comment"}
    request_headers = {"Authorization": f"Bearer {token}"} 
    update_comment_response = client.put(
        "/api/photos/1/comments/2",
        data=json.dumps(comment_data),
        content_type="application/json",
        headers=request_headers,
    )
    assert update_comment_response.json["comments"][1]["content"] == "I've changed the comment"