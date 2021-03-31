from .db import db
from datetime import date, datetime


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    thumbnail = db.Column(db.String(100), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), nullable=False, )
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    views = db.Column(db.Integer, nullable=True, default=0)
    created_at = db.Column(db.Date, default=date.today(), nullable=True)

    video_info = db.relationship('VideoInfo', back_populates='videos')
    game = db.relationship('Game')
    channel = db.relationship('Channel')
