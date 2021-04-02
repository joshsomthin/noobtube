from .db import db


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)

    gametags = db.relationship(
        'GameTag', back_populates='tag', passive_deletes=True)

    def get_name(self):
        return self.name

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
