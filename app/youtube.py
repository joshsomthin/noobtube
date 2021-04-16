# -*- coding: utf-8 -*-

# Sample Python code for youtube.search.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/guides/code_samples#python

import os
import json
from datetime import datetime, date
from googleapiclient.discovery import build

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]


def to_info(video, game_id):
    return {
        "channel_name": video['snippet']['channelTitle'],
        "game_id": game_id,
        "yt_channel_id": video['snippet']['channelId'],
        "yt_video_id": video['id']['videoId'],
        "title": video['snippet']['title'],
        "image_path": video['snippet']['thumbnails']['medium']['url'],
        "views": 0,
        "created_at": datetime.strftime(
            datetime.strptime(
                video['snippet']['publishedAt'], '%Y-%m-%dT%H:%M:%SZ')
            .date(), '%Y-%m-%d'),
        "video_path": 'https://www.youtube.com/watch?v=' + video['id']['videoId'],
        "description": video['snippet']['description']
    }


def search_youtube(search,  game_id, number_of_results=12, next=None):
    key = os.environ["YOUTUBE_API_KEY"]

    api_service_name = "youtube"
    api_version = "v3"

    youtube = build(api_service_name, api_version, developerKey=key)
    if next:
        next = youtube.search().list(
            part="snippet",
            q=search,
            maxResults="16",
            eventType="completed",
            type='video',
            videoCategoryId="20",
            regionCode='US',
            pageToken=next)
        res2 = next.execute()
        return {
            "next": res2['nextPageToken'],
            "prev": res2['prevPageToken'],
            "videos": [to_info(video) for video in res2['items']]
        }
    else:
        request = youtube.search().list(
            part="snippet",
            q=search,
            maxResults=number_of_results,
            type='video',
            videoCategoryId="20",
            regionCode='US'
        )
        response = request.execute()
        return {
            "next": response['nextPageToken'],
            "videos": [to_info(video, game_id) for video in response['items']],
        }
