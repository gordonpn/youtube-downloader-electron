# YouTube Downloader

## Motivation

This project started from my parents asking me how to download YouTube videos or music from YouTube. 
The problem is that I didn't want to send my parents to a suspicious online tool filled with ads.
At first, I made them a Python commandline app to download, but that was too verbose.
I had the idea to have a try at developing a clean and straightforward UI as a desktop app for them to use. 

---

![GitHub](https://img.shields.io/github/license/gpnn/youtube-downloader-electron?style=flat-square)

![GitHub top language](https://img.shields.io/github/languages/top/gpnn/youtube-downloader-electron?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/gpnn/youtube-downloader-electron?style=flat-square)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/gpnn/youtube-downloader-electron?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/gpnn/youtube-downloader-electron?style=flat-square)

## Objective

Download YouTube videos as mp3 or mp4, hassle-free. With a an easy-to-use and enjoyable interface.

## Screenshot

Work in progress (WIP) screenshot

![Screenshot](./doc/recording.gif)

## Built with / technologies

* UIkit CSS framework
* Electron.js
* Node.js

## Getting started

### For development

* Clone this repo
* Run `npm install` in the root directory to install dependencies
* Run `npm start` to start the development server (Electron)

#### To build / package

* Run `npm run pack`

For this step, you will need have NPM and the dependencies installed.

### For general usage

Please take a look at the [Releases](https://github.com/gpnn/youtube-downloader-electron/releases/). 

### Prerequisites

* Node.js 12+
* [FFmpeg](https://www.ffmpeg.org/)

This project makes use of FFmpeg to convert to mp3.

## Roadmap / Todo

* [x] Implement back-end logic for downloading
* [x] Release alpha
* [x] Add bulk download functionality
* [x] Right click to paste functionality
* [x] Button to open folder with downloaded content
* [x] Separate downloaded content from Electron files

## License

[MIT License](https://choosealicense.com/licenses/mit/#)
