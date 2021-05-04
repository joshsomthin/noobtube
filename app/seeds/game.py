import requests
import os
import json
from datetime import datetime, date
from app.models import db, Game, Tag, User, Video
from .users import seed_users
from .video import seed_video


def create_game(game):
    return Game(game=game['name'], image_path=game['background_image'])


def game_to_json(game):
    return {
        'name': game['name'],
        'image_path': game['background_image']
    }


def seed_games(url="https://api.rawg.io/api/games"):

    allgenres = Tag.query.all()
    genres = {genre.name: genre for genre in allgenres}

    headers = {
        'key': os.environ.get('RAPIDAPI_KEY').strip(),
    }

    response = requests.request("GET", url, params=headers)
    json_data = json.loads(response.text)

    for res in json_data['results']:
        if res['released'] == None:
            return
        if datetime.strptime(res['released'], '%Y-%m-%d').date() > date(2011, 1, 1):
            game = create_game(res)
            db.session.add(game)
            db.session.commit()
            for genre in res['genres']:
                genre_obj = genres[genre['name']]
                game.tags.append(genre_obj)
    if json_data['next']:
        seed_games(json_data['next'])


def search_games(search, url="https://api.rawg.io/api/games"):

    headers = {
        'key': os.environ.get('RAPIDAPI_KEY').strip(),
        'search': search
    }
    response = requests.request("GET", url, params=headers)
    json_data = json.loads(response.text)
    return {'results': [game_to_json(res) for res in json_data['results']]}
