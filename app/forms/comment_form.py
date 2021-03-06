from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment


class CommentForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])
