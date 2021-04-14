# -*- coding: utf-8 -*-

# Sample Python code for youtube.search.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/guides/code_samples#python

import os
import json
from googleapiclient.discovery import build

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]


def to_info(video):
    # return video['snippet']['title']
    vid = {
        "title": video['snippet']['title'],
        "image_path": video['snippet']['thumbnails']['medium']['url'],
        "views": 0,
        "created_at": video['snippet']['publishedAt'],
        "video_path": 'https://www.youtube.com/watch?v=' + video['id']['videoId'],
        "description": video['snippet']['description']
    }
    return vid


def main(search, next=None):
    key = os.environ["YOUTUBE_API_KEY"]

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "./youtube_secret.json"

    youtube = build(api_service_name, api_version, developerKey=key)
    if next:
        next = youtube.search().list(
            part="snippet",
            q=search,
            eventType="completed",
            type='video',
            videoCategoryId="20",
            regionCode='US',
            pageToken=next)
        res2 = next.execute()
        info = {
            "next": res2['nextPageToken'],
            "prev": res2['prevPageToken'],
            "videos": [to_info(video) for video in res2['items']]
        }
        print(json.dumps(info, indent=2))
    else:
        request = youtube.search().list(
            part="snippet",
            q=search,
            eventType="completed",
            type='video',
            videoCategoryId="20",
            regionCode='US'
        )
        response = request.execute()
        print(json.dumps(response, indent=2))
        info = {
            "next": response['nextPageToken'],
            "videos": [to_info(video) for video in response['items']],
        }

        print(json.dumps(info, indent=2))


if __name__ == "__main__":
    main('GTA V', "CAUQAA")
