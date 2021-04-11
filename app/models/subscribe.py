from .db import db


class Subscription(db.Model):
    __tablename__ = 'subscriptions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id',  ondelete='CASCADE',), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id', ondelete='CASCADE',),  nullable=False)

    subs = db.relationship(
        'Channel', back_populates='subscribers', )
    users = db.relationship(
        'User', back_populates='subscriptions', )

    def to_dict(self):
        return self.channel_id
