from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    channels = db.relationship(
        'Channel', back_populates='user', passive_deletes=True)
    subscriptions = db.relationship(
        'Subscription', back_populates='users', passive_deletes=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_subscriptions(self):
        return {"subscriptions": [sub.to_dict() for sub in self.subscriptions]}

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }
