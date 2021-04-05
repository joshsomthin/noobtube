import requests
import os
import json
from datetime import datetime, date
from app.models import db, Game, Tag


def seed_games(url="https://rawg-video-games-database.p.rapidapi.com/games"):

    allgenres = Tag.query.all()
    genres = {genre.name: genre for genre in allgenres}

    headers = {
        'x-rapidapi-key': os.environ.get('RAPIDAPI_KEY').strip(),
        'x-rapidapi-host': "rawg-video-games-database.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)
    json_data = json.loads(response.text)

    for res in json_data['results']:
        if res['released'] == None:
            return
        if datetime.strptime(res['released'], '%Y-%m-%d').date() > date(2011, 1, 1):
            game = Game(game=res['name'], image_path=res['background_image'])
            db.session.add(game)
            db.session.commit()
            for genre in res['genres']:
                genre_obj = genres[genre['name']]
                game.tags.append(genre_obj)
    if json_data['next']:
        seed_games(json_data['next'])
