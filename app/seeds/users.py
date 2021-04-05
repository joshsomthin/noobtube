from werkzeug.security import generate_password_hash
from app.models import db, User, Channel
from datetime import date

# Adds a demo user, you can add other users here if you want


def seed_users(username='Demo'):
    username = username[0:30]
    demo = User(username=username, email=f'{username}@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()

    channel = Channel(user_id=demo.id, name=username, created_at=date.today())
    db.session.add(channel)
    db.session.commit()
    return channel

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
