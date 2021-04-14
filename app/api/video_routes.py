from flask import Blueprint, jsonify
from app.models import Video, User, Subscription, db, Video, Channel, Game
from flask_login import login_required
from app.youtube import search_youtube
import json


video_routes = Blueprint('videos', __name__)


@video_routes.route('/<int:gameId>')
def get_videos(gameId):
    videos = Video.query.filter(Video.game_id == gameId).all()
    game = Game.query.filter(Game.id == gameId).first()
    results = search_youtube(
        search=game.game, number_of_results=12-len(videos))
    # print('------------------------------',
    #       [video.to_dict() for video in videos] + results['videos'])
    return {"videos": [video.to_dict() for video in videos] + results['videos']}


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
