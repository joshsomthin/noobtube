from .db import db
from datetime import date


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey(
        'videos.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE',),  nullable=False)
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Date, default=date.today(), nullable=False)

    users = db.relationship(
        'User', back_populates='comments')
    videos = db.relationship(
        'Video', back_populates='comments')

    @property
    def get_body(self):
        return self.body

    def to_timedifference(self):
        if self.created_at:
            time_delta = date.today() - self.created_at
            return time_delta.days

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.users.username,
            "video_id": self.video_id,
            "user_id": self.user_id,
            "body": self.body,
            "date": self.to_timedifference(),
        }
