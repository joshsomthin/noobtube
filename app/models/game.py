from .db import db


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    game = db.Column(db.String(100), nullable=False)

    videos = db.relationship('Video', back_populates='games')
    tags = db.relationship('GameTags', back_populates='games')
