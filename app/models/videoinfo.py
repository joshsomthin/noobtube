from .db import db


class VideoInfo(db.Model):
    __tablename__ = 'videos_info'

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey(
        'videos.id'), nullable=False)
    video_path = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text, nullable=True, default='')

    video = db.relationship('Video', back_populates='videos_info')
