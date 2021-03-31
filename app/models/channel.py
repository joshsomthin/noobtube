from .db import db
from datetime import date


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.Date, default=date.today(), nullable=True)

    subscribers = db.relationship('Subscription', back_populates='channels')
