import requests
import json
from datetime import datetime, date
from app.models import db, Game, GameTag, Tag


def seed_games(url="https://rawg-video-games-database.p.rapidapi.com/games"):

    allgenres = Tag.query.all()
    genres = {genre.name: genre.id for genre in allgenres}

    headers = {
        'x-rapidapi-key': 'x-rapidapi-key': os.environ['RAPIDAPI_KEY'], ,
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
                genreId = genres[genre['name']]
                genre = GameTag(game_id=game.id, tag_id=genreId)
                db.session.add(genre)
            db.session.commit()
    if json_data['next']:
        seed_games(json_data['next'])
