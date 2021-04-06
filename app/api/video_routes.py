from flask import Blueprint, jsonify
from app.models import Video

video_routes = Blueprint('videos', __name__)


@video_routes.route('/<int:gameId>')
def get_videos(gameId):
    videos = Video.query.filter(Video.game_id == gameId).all()
    return {"videos": [video.to_dict() for video in videos]}


@video_routes.route('/video/<int:videoId>')
def get_video(videoId):
    video = Video.query.filter(Video.id == videoId).first()
    return {"video": video.to_dict()}
