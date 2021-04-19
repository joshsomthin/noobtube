from .db import db
from datetime import date, datetime


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    image_path = db.Column(db.String(100), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id', ondelete='CASCADE',),  nullable=False, )
    game_id = db.Column(db.Integer, db.ForeignKey(
        'games.id', ondelete='CASCADE',),  nullable=False)
    views = db.Column(db.Integer, nullable=True, default=0)
    created_at = db.Column(db.Date, default=date.today(), nullable=True)
    video_path = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text, nullable=True, default='')
    yt_video_id = db.Column(db.String(30), nullable=True)

    games = db.relationship(
        'Game', back_populates='videos', )
    channel = db.relationship(
        'Channel', back_populates='videos')

    def to_timedifference(self):
        if self.created_at:
            time_delta = date.today() - self.created_at
            return time_delta.days

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "image_path": self.image_path,
            "channel_id": self.channel_id,
            "game_id": self.game_id,
            "views": self.views,
            "days_since_creation": self.to_timedifference(),
            "created_at": self.created_at.strftime("%b %d %Y", ),
            "channel": self.channel.name,
            "video_path": self.video_path,
            "description": self.description,
            "yt_video_id": self.yt_video_id
        }
