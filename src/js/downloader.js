const fs = require("fs");
const path = require("path");
const openExplorer = require("open-file-explorer");
const youtubeDownloader = require("ytdl-core");
const { dialog } = require("electron").remote;
const ProgressBar = require("progressbar.js/dist/progressbar");

let downloadDir = "./Download";

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
    extension = ".mp3";
    options = {
      quality: "highestaudio",
      filter: "audioonly",
    };
  } else {
    extension = ".mp4";
    options = {
      quality: "highest",
      filter: (format) => format.container === "mp4",
    };
  }

  return new Promise((resolve, reject) => {
    const metadata = youtubeDownloader.getInfo(url);

    metadata.then((value) => {
      const { title } = value;

      const youtube = youtubeDownloader.downloadFromInfo(value, options);
      const line = new ProgressBar.Line("#progress-bars");

      youtube.on("response", (response) => {
        const totalSize = response.headers["content-length"];
        let dataRead = 0;
        response.on("data", (data) => {
          dataRead += data.length;
          const percent = dataRead / totalSize;
          line.animate(percent, { easing: "easeInOut" });
        });
      });

      youtube.on("error", () => {
        reject(new Error(`There was an error while downloading ${title}`));
      });

      youtube.on("end", () => {
        resolve({ message: `${title} finished downloading with success` });
        line.destroy();
      });

      youtube.pipe(
        fs.createWriteStream(path.join(downloadDir, `${title}${extension}`))
      );
    });
  });
};

const openFolder = () => {
  openExplorer(downloadDir, () => {});
};

const setSaveFolder = () => {
  dialog
    .showOpenDialog({ properties: ["openDirectory", "createDirectory"] })
    .then((result) => {
      if (!result.canceled) {
        [downloadDir] = result.filePaths;
      }
    });
};

module.exports.download = download;
module.exports.openFolder = openFolder;
module.exports.setSaveFolder = setSaveFolder;
