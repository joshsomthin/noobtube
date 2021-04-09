from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import asc, desc
import requests
from app.models import User, Subscription, db, Video

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {
        "users": [user.to_dict() for user in users]
    }


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/subscribe', methods=['POST'])
@login_required
def subscribe():
    data = request.json
    subscribe = Subscription(user_id=data['user_id'],
                             channel_id=data['channel_id'])
    db.session.add(subscribe)
    db.session.commit()
    return user(data['user_id'])


@user_routes.route('/unsubscribe', methods=['DELETE'])
@login_required
def unsubscriptions():
    data = request.json
    subscription = User.query.get(data['user_id'])
    subscription = subscription.get_unsubscription(
        channel_id=data['channel_id'])
    db.session.delete(subscription)
    db.session.commit()
    return user(data['user_id'])
