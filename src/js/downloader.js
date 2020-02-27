const fs = require('fs');
const youtubeDownloader = require('ytdl-core');
const youtubeDownloaderMp3 = require('youtube-mp3-downloader');

module.exports = (url, video_id, audioOnly) => {

  if (audioOnly) {
    downloadAudio(video_id);
  } else {
    downloadVideo(url);
  }

};

const downloadAudio = (video_id) => {
  const youtube = new youtubeDownloaderMp3({
    'outputPath': '.',
    'youtubeVideoQuality': 'highest',
    'queueParallelism': 2,
    'progressTimeout': 2000
  });

  youtube.download(video_id);

  youtube.on('finished', (err, data) => {
    console.log(JSON.stringify(data));
  });

  youtube.on('error', (error) => {
    console.log(error);
  });

  youtube.on('progress', (progress) => {
    console.log(JSON.stringify(progress));
  });

};

const downloadVideo = (url) => {

  const metadata = youtubeDownloader.getInfo(url);

  metadata.then(value => {

    console.log(value);
    const title = value.title;

    const youtube = youtubeDownloader.downloadFromInfo(value, {
      quality: 'highest',
      filter: format => format.container === 'mp4'
    });

    youtube.on('progress', (progress) => {
      console.log(JSON.stringify(progress));
    });

    youtube.pipe(fs.createWriteStream(`${title}.mp4`));

  });

};