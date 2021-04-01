from .db import db
from datetime import date, datetime


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    thumbnail = db.Column(db.String(100), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id', ondelete='CASCADE',),  nullable=False, )
    game_id = db.Column(db.Integer, db.ForeignKey(
        'games.id', ondelete='CASCADE',),  nullable=False)
    views = db.Column(db.Integer, nullable=True, default=0)
    created_at = db.Column(db.Date, default=date.today(), nullable=True)

    videos_info = db.relationship(
        'VideoInfo', back_populates='videos', passive_deletes=True)
    games = db.relationship(
        'Game', back_populates='videos', )
    channel = db.relationship(
        'Channel', back_populates='videos', )
