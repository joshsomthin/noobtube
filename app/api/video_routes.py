from flask import Blueprint, jsonify, request, json
from app.models import Video, User, Subscription, db, Video, Channel, Game
from flask_login import login_required
from app.youtube import search_youtube
from app.seeds.game import search_games
from sqlalchemy import desc


video_routes = Blueprint('videos', __name__)


@video_routes.route('/<int:gameId>')
def get_videos(gameId):
    videos = Video.query.filter(
        Video.game_id == gameId).order_by(desc(Video.views)).all()
    seeded_yt_video_id = [video.get_video_id() for video in videos]
    game = Game.query.filter(Game.id == gameId).first()
    results = search_youtube(
        search=game.game, game_id=gameId)  # quota limit reached. Add back in tomorrow when quota is working.
    return {"videos": [video.to_dict() for video in videos] +
            [video for video in results['videos']
            if video['yt_video_id'] not in seeded_yt_video_id]}
    #   #search functionality removed because of quota limit


@video_routes.route('/video/<int:videoId>')
def get_video(videoId):
    video = Video.query.filter(Video.id == videoId).first()
    return {"video": video.to_dict()}


@video_routes.route('<int:user_id>/subscriptions')
@login_required
def subscriptions(user_id):
    user = User.query.get(user_id).to_dict()
    subscriptions = user['subscriptions']
    videos = Video.query.order_by(Video.created_at.desc()).filter(
        Video.channel_id.in_(subscriptions)).all()
    return {"subscription_videos": [video.to_dict() for video in videos]}


@video_routes.route('<int:channel_id>/channel')
@login_required
def channel_videos(channel_id):
    channel = Channel.query.get(channel_id)
    videos = channel['videos']
    return {"channel_vids": [video.to_dict for video in videos]}


@video_routes.route('<int:video_id>/watched', methods=['PUT'])
def update_views(video_id):
    channel = Video.query.get(video_id)
    channel.views = channel.views + 1
    db.session.commit()
    return {"views": channel.views}


@video_routes.route('/new', methods=['POST'])
def add_video():
    data = request.json
    doesChannelExist = Channel.query.filter(
        Channel.name == data['channel_name']).first()
    if not doesChannelExist:
        user = User(username=data['channel_name'], email=(
            data['channel_name'] + '@yt.io'), password='password')
        db.session.add(user)
        db.session.commit()
        doesChannelExist = Channel(name=data['channel_name'], user_id=user.id)
        db.session.add(doesChannelExist)
        db.session.commit()
    video = Video(title=data['title'],
                  image_path=data['image_path'],
                  channel_id=doesChannelExist.id,
                  game_id=data['game_id'],
                  views=data['views'],
                  video_path=data['video_path'],
                  description=data['description'],
                  yt_video_id=data['yt_video_id'])
    db.session.add(video)
    db.session.commit()
    return {"video": video.to_dict()}


@video_routes.route('/search', methods=['POST'])
def search_bar():
    data = request.json
    if data == '':
        return
    search_games(data)
    videos = Game.query.filter(Game.game.ilike(
        f'%{data}%')).all()
    return {'results': [vid.to_dict() for vid in videos]}


@video_routes.route('<int:video_id>/comment', methods=['POST'])
def post_comment(video_id):
    data = request.json
