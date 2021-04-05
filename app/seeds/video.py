from app.models import db, Video, VideoInfo


def seed_video(title, thumbnail, channel_id, game_id, created_at, video_path):
    title = title[0:49]
    video = Video(title=title, thumbnail=thumbnail,
                  channel_id=channel_id, game_id=game_id,
                  created_at=created_at)
    db.session.add(video)
    db.session.commit()

    videoInfo = VideoInfo(video_id=video.id, video_path=video_path)

    db.session.add(videoInfo)
    db.session.commit()
