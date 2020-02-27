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

![Screenshot](https://github.com/gpnn/youtube-downloader-electron/blob/master/doc/Screen%20Shot%202020-01-29%20at%209.21.20%20PM.png?raw=true)

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

* Run `npm pack`

For this step, you will need have NPM and the dependencies installed.

### For general usage

_To be released_ 

### Prerequisites

* Node.js 12+
* [FFmpeg](https://www.ffmpeg.org/)

This project makes use of FFmpeg to convert to mp3.

### Configuration

_Nothing yet_

## Roadmap / Todo

* [x] Implement back-end logic for downloading
* [ ] Release alpha

## License

[MIT License](https://choosealicense.com/licenses/mit/#)
