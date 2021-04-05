from flask import Blueprint, jsonify
from app.models import Video

video_routes = Blueprint('videos', __name__)


@video_routes.route('/<int:gameId>')
def get_videos(gameId):
    videos = Video.query.filter(Video.game_id == gameId).all()
    return {"videos": [video.to_dict() for video in videos]}
