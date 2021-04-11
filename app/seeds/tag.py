import requests
import json
import os
from app.models import db, Tag


def seed_tags():
    url = "https://rawg-video-games-database.p.rapidapi.com/genres"

    headers = {
        'x-rapidapi-key': os.environ.get('RAPIDAPI_KEY').strip(),
        'x-rapidapi-host': "rawg-video-games-database.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    json_data = json.loads(response.text)

    for res in json_data['results']:
        tag = Tag(name=res['name'])
        db.session.add(tag)
    db.session.commit()
