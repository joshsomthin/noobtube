from .db import db


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    game = db.Column(db.String(100), nullable=False)
    image_path = db.Column(db.String(500), nullable=False)

    videos = db.relationship(
        'Video', back_populates='games', passive_deletes=True)

    @property
    def get_id(self):
        return self.id

    @property
    def get_game(self):
        return self.game

    def to_dict(self):
        return {
            'id': self.id,
            'game': self.game,
            'image_path': self.image_path
        }

    def to_name(self):
        return self.game
