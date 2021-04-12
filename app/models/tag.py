from .db import db

games_tags = db.Table(
    'games_tags',
    db.Column('game_id', db.Integer, db.ForeignKey(
        'games.id', ondelete='CASCADE',)),
    db.Column('tag_id', db.Integer, db.ForeignKey(
        'tags.id', ondelete='CASCADE')),
)


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)

    games = db.relationship(
        'Game', secondary='games_tags', backref='tags', lazy='dynamic')

    def get_name(self):
        return self.name

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
