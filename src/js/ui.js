const path = require('path');
const download = require(path.join(__dirname, 'js/downloader.js'));

document.getElementById('link-input').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

function buttonClicked(audioOnly) {
  const re = new RegExp('^((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube\\.com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)?$');
  const url_link = document.getElementById('link-input').value;
  const input_element = document.getElementById('link-input');
  const updates_element = document.getElementById('updates');
  console.log(url_link);

  const match = re.exec(url_link);

  function show_error() {
    const error_alert = document.createElement('div');
    error_alert.className = 'uk-alert-danger';
    const para = document.createElement('p');
    para.textContent = 'Link is not valid';
    const close_button = document.createElement('a');
    close_button.className = 'uk-alert-close';
    close_button.setAttribute('uk-close', '');
    error_alert.appendChild(close_button);
    error_alert.appendChild(para);
    updates_element.appendChild(error_alert);

    setTimeout(() => {
      UIkit.alert(error_alert).close();
    }, 10000);
  }

  function show_success() {
    const success_alert = document.createElement('div');
    success_alert.className = 'uk-alert-success';
    const para = document.createElement('p');
    para.textContent = 'Downloading!';
    const close_button = document.createElement('a');
    close_button.className = 'uk-alert-close';
    close_button.setAttribute('uk-close', '');
    success_alert.appendChild(close_button);
    success_alert.appendChild(para);
    updates_element.appendChild(success_alert);

    setTimeout(() => {
      UIkit.alert(success_alert).close();
    }, 10000);
  }

  if (!match) {
    console.log('Not valid link.');
    input_element.className = 'uk-form-danger uk-input uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
    input_element.setAttribute('uk-tooltip', 'title: This link is not valid.; pos: right');

    show_error();

    setTimeout(() => {
      input_element.removeAttribute('uk-tooltip');
      input_element.className = 'uk-input uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
      input_element.value = '';
    }, 10000);

  } else {
    console.log('Valid link!');
    console.log(`id: ${match[5]}`);
    input_element.className = 'uk-form-success uk-input uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';

    download(url_link, audioOnly);
    show_success();

    setTimeout(() => {
      input_element.className = 'uk-input uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
      input_element.value = '';
    }, 10000);
  }
}
