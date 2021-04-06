from app.models import db, Video


def seed_video(title, thumbnail, channel_id, game_id, created_at, video_path):
    title = title[0:49]
    video = Video(title=title, image_path=thumbnail,
                  channel_id=channel_id, game_id=game_id,
                  created_at=created_at, video_path=video_path)
    db.session.add(video)
    db.session.commit()
