from .db import db


class GameTag(db.Model):
    __tablename__ = 'gametags'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey(
        'games.id', ondelete='CASCADE',),   nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id', ondelete='CASCADE',),
                       nullable=False)

    games = db.relationship(
        'Game', back_populates='tags',)
    tag = db.relationship('Tag', back_populates='gametags', )
