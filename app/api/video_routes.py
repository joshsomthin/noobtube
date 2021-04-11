from flask import Blueprint, jsonify
from app.models import Video, User, Subscription, db, Video, Channel
from flask_login import login_required


video_routes = Blueprint('videos', __name__)


@video_routes.route('/<int:gameId>')
def get_videos(gameId):
    videos = Video.query.filter(Video.game_id == gameId).all()
    return {"videos": [video.to_dict() for video in videos]}


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
