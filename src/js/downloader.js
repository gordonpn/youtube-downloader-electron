const fs = require('fs');
const youtubeDownloader = require('ytdl-core');
const youtubeDownloaderMp3 = require('youtube-mp3-downloader');

const downloadAudio = (video_id) => {
  return new Promise((resolve, reject) => {
    const youtube = new youtubeDownloaderMp3({
      'outputPath': '.',
      'youtubeVideoQuality': 'highest',
      'queueParallelism': 2,
      'progressTimeout': 2000
    });

    youtube.download(video_id);

    youtube.on('finished', (err, data) => {
      resolve({message: `${data['videoTitle']} finished downloading with success`});
      if (err) {
        reject({message: `There was an error while downloading ${data['videoTitle']}`});
      }
    });
  })
};

const downloadVideo = (url) => {
  return new Promise((resolve, reject) => {
    const metadata = youtubeDownloader.getInfo(url);

    metadata.then(value => {
      const title = value.title;

      const youtube = youtubeDownloader.downloadFromInfo(value, {
        quality: 'highest',
        filter: format => format.container === 'mp4'
      });

      youtube.on('error', (event) =>{
        reject({message:`There was an error while downloading ${title}`})
      });

      youtube.on('end', (event) => {
        resolve({message: `${title} finished downloading with success`});
      });

      youtube.pipe(fs.createWriteStream(`${title}.mp4`));

    });
  })

};

module.exports.downloadAudio = downloadAudio;
module.exports.downloadVideo = downloadVideo;