from app import app, db
import json
from tests.lib import login

def test_get_photos():

    client = app.test_client()

    response = client.get("/api/photos")

    assert len(response.json) == 18

    assert response.status_code == 200


def test_upload_photo():

    client = app.test_client()
    token = login(client)

    photo_data = {"url": "https://photo.com", "caption": "Great photo", "rating": 4}
    request_headers = {"Authorization": f"Bearer {token}"}
    photo_response = client.post(
        "/api/photos",
        data=json.dumps(photo_data),
        content_type="application/json",
        headers=request_headers,
    )

    assert photo_response.json["caption"] == "Great photo"

