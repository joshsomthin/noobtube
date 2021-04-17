import requests
import os
import json
from datetime import datetime, date
from app.models import db, Game, Tag, User, Video
from .users import seed_users
from .video import seed_video


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
            game_name = res['name']
            game = Game(game=game_name, image_path=res['background_image'])
            channel = seed_users(game_name)
            db.session.add(game)
            db.session.commit()
            # if res['clip'] and res['clip']['preview']:
            #     seed_video(title=f'{game_name} clip',
            #                thumbnail=res['clip']['preview'],
            #                channel_id=channel.id,
            #                game_id=game.id,
            #                created_at=date.today(),
            #                video_path=res['clip']['clip']
            #                )
            for genre in res['genres']:
                genre_obj = genres[genre['name']]
                game.tags.append(genre_obj)
    if json_data['next']:
        seed_games(json_data['next'])
