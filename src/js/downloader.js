const fs = require('fs');
const path = require('path');
const openExplorer = require('open-file-explorer');
const youtubeDownloader = require('ytdl-core');

const downloadDir = './Download';

const createDownloadDir = () => {
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }
};

const download = (url, audioOnly) => {
  createDownloadDir();
  let extension;
  let options;

  if (audioOnly) {
    extension = '.mp3';
    options = {
      quality: 'highestaudio',
      filter: 'audioonly'
    };
  } else {
    extension = '.mp4';
    options = {
      quality: 'highest',
      filter: format => format.container === 'mp4'
    };
  }

  return new Promise((resolve, reject) => {
    const metadata = youtubeDownloader.getInfo(url);

    metadata.then(value => {
      const { title } = value;

      const youtube = youtubeDownloader.downloadFromInfo(value, options);

      youtube.on('error', () => {
        reject({ message: `There was an error while downloading ${title}` });
      });

      youtube.on('end', () => {
        resolve({ message: `${title} finished downloading with success` });
      });

      youtube.pipe(fs.createWriteStream(path.join(downloadDir, `${title}${extension}`)));
    });
  });
};

const openFolder = () => {
  openExplorer(downloadDir, () => {});
};

module.exports.download = download;
module.exports.openFolder = openFolder;
