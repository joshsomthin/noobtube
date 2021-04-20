import requests
import json
import os
from app.models import db, Tag


def seed_tags():
    url = "https://api.rawg.io/api/genres"

    headers = {
        'key': os.environ.get('RAPIDAPI_KEY').strip(),
    }

    response = requests.request("GET", url, params=headers)

    json_data = json.loads(response.text)

    for res in json_data['results']:
        tag = Tag(name=res['name'])
        db.session.add(tag)
    db.session.commit()
