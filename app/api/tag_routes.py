from flask import Blueprint, jsonify
from app.models import Tag

tag_routes = Blueprint('tags', __name__)


@tag_routes.route('/')
def tags():
    tags = Tag.query.all()
    return {'tags': [tag.to_dict() for tag in tags]}


@tag_routes.route('/<int:id>/limit')
def games_by_tags(id):
    tag = Tag.query.filter(Tag.id == id).first()
    return {'games': [g.to_dict() for g in tag.games.limit(10)]}
