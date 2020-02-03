import sys
from typing import List

import youtube_dl

url: str = sys.argv[1]
audio_only: str = sys.argv[2]


def _get_opts():
    if audio_only.lower() == 'true':
        return {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '320',
            }]
        }
    else:
        return {
            'format': 'best'
        }


def download():
    url_as_list: List[str] = [url]
    with youtube_dl.YoutubeDL(_get_opts()) as ydl:
        ydl.download(url_as_list)


download()
