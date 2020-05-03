const path = require('path');
const clipboardy = require('clipboardy');

const { validateLinks } = require(path.join(__dirname, 'js/validate.js'));
const { download, openFolder, setSaveFolder } = require(path.join(
  __dirname,
  'js/downloader.js'
));

const linksTextArea = document.getElementById('links-textarea');
let updatesElement = document.getElementById('updates');
const mainCard = document.getElementById('main-card');
const videoDownloadButton = document.getElementById('video-download');
const audioDownloadButton = document.getElementById('audio-download');
const pasteLinkButton = document.getElementById('paste-link');
const clearInputButton = document.getElementById('clear-input');

const showMessage = response => {
  let alertType;
  if (response.includes('not valid')) {
    alertType = 'uk-alert-danger';
    linksTextArea.className =
      'uk-textarea uk-form-danger uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
    linksTextArea.setAttribute(
      'uk-tooltip',
      'title: One of these links is not valid.; pos: right'
    );
  } else if (response.includes('success')) {
    alertType = 'uk-alert-primary';
  } else if (response.includes('error')) {
    alertType = 'uk-alert-warning';
  } else {
    alertType = 'uk-alert-success';
    linksTextArea.className =
      'uk-textarea uk-form-success uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
  }
  updatesElement.className = alertType;
  const para = document.createElement('p');
  para.textContent = response;
  para.className = 'uk-text-normal uk-text-center';
  updatesElement.appendChild(para);

  setTimeout(() => {
    // eslint-disable-next-line no-undef
    UIkit.alert(updatesElement).close();
    const footer = document.createElement('div');
    footer.id = 'updates';
    footer.setAttribute('uk-alert', '');
    mainCard.appendChild(footer);
    updatesElement = footer;
  }, 10000);
};

const processLinks = audioOnly => {
  const links = linksTextArea.value;
  const linksArray = links.split('\n');
  linksArray.forEach(link => {
    validateLinks(link)
      .then(value => {
        showMessage(value.message);
        download(value.link, audioOnly)
          .then(response => showMessage(response.message))
          .catch(reason => showMessage(reason.message));
      })
      .catch(reason => {
        showMessage(reason.message);
      });
  });
};

const autoExpand = field => {
  field.style.height = 'inherit';

  const computed = window.getComputedStyle(field);

  const height =
    parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    field.scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = `${height}px`;
};

linksTextArea.addEventListener('input', event => {
  if (linksTextArea.value.length > 0) {
    videoDownloadButton.removeAttribute('disabled');
    audioDownloadButton.removeAttribute('disabled');
    clearInputButton.removeAttribute('disabled');
  } else {
    videoDownloadButton.setAttribute('disabled', '');
    audioDownloadButton.setAttribute('disabled', '');
    clearInputButton.setAttribute('disabled', '');
  }
  autoExpand(event.target);
});

videoDownloadButton.addEventListener('click', () => {
  processLinks(false);
});

audioDownloadButton.addEventListener('click', () => {
  processLinks(true);
});

pasteLinkButton.addEventListener('click', () => {
  clipboardy.read().then(result => {
    if (linksTextArea.value.length > 0) {
      linksTextArea.textContent += `\n${result}`;
    } else {
      linksTextArea.textContent = result;
    }
    linksTextArea.dispatchEvent(new Event('input', { bubbles: true }));
  });
});

clearInputButton.addEventListener('click', () => {
  linksTextArea.removeAttribute('uk-tooltip');
  linksTextArea.className =
    'uk-textarea uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
  linksTextArea.value = '';
  videoDownloadButton.setAttribute('disabled', '');
  audioDownloadButton.setAttribute('disabled', '');
});

document.getElementById('open-folder').addEventListener('click', () => {
  openFolder();
});

document.getElementById('save-folder').addEventListener('click', () => {
  setSaveFolder();
});
