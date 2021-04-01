from .db import db
from datetime import date


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE',),  nullable=False)
    created_at = db.Column(db.Date, default=date.today(), nullable=True)

    user = db.relationship(
        'User', back_populates='channels')
    subscribers = db.relationship(
        'Subscription', back_populates='subs', passive_deletes=True)
    videos = db.relationship(
        'Video', back_populates='channel', passive_deletes=True)
