from .db import db
from datetime import date


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, ForeignKey(
        'videos.id', ondelete='CASCASDE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE',),  nullable=False)
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Date, default=date.today(), nullable=False)

    users = db.relationship(
        'User', back_populates='comments')
    videos = db.relationship(
        'Video', back_populates='channel')

    @property
    def get_body(self):
        return self.body
