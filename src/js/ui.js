const path = require('path');

const { validateLinks } = require(path.join(__dirname, 'js/validate.js'));
const { downloadAudio, downloadVideo, openFolder } = require(path.join(__dirname, 'js/downloader.js'));

const linksTextArea = document.getElementById('links-textarea');
let updatesElement = document.getElementById('updates');
const mainCard = document.getElementById('main-card');

const showMessage = (response) => {
  let alertType;
  if (response.includes('not valid')) {
    alertType = 'uk-alert-danger';
    linksTextArea.className = 'uk-textarea uk-form-danger uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
    linksTextArea.setAttribute('uk-tooltip', 'title: One of these links is not valid.; pos: right');
  } else if (response.includes('success')) {
    alertType = 'uk-alert-primary';
  } else if (response.includes('error')) {
    alertType = 'uk-alert-warning';
  } else {
    alertType = 'uk-alert-success';
    linksTextArea.className = 'uk-textarea uk-form-success uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
  }
  updatesElement.className = alertType;
  const para = document.createElement('p');
  para.textContent = response;
  para.className = 'uk-text-large uk-text-normal uk-text-center';
  updatesElement.appendChild(para);

  setTimeout(() => {
    linksTextArea.removeAttribute('uk-tooltip');
    linksTextArea.className = 'uk-textarea uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
    linksTextArea.value = '';
    UIkit.alert(updatesElement).close();
    const footer = document.createElement('div');
    footer.id = 'updates';
    footer.setAttribute('uk-alert', '');
    mainCard.appendChild(footer);
    updatesElement = footer;
  }, 10000);
};

const processLinks = (audioOnly) => {
  const links = linksTextArea.value;
  const linksArray = links.split('\n');
  linksArray.forEach(link => {
    validateLinks(link)
      .then(value => {
        showMessage(value.message);
        if (audioOnly) {
          downloadAudio(value.id)
            .then(response => showMessage(response.message))
            .catch(reason => showMessage(reason.message));
        } else {
          downloadVideo(value.link)
            .then(response => showMessage(response.message))
            .catch(reason => showMessage(reason.message));
        }
      })
      .catch(reason => {
        showMessage(reason.message);
      });
  });
};

linksTextArea.addEventListener('input', (event) => {
  const autoExpand = (field) => {
    field.style.height = 'inherit';

    const computed = window.getComputedStyle(field);

    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + field.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = height + 'px';
  };

  autoExpand(event.target);
});

document.getElementById('video-download').addEventListener('click', () => {
  processLinks(false);
});

document.getElementById('audio-download').addEventListener('click', () => {
  processLinks(true);
});

document.getElementById('open-folder').addEventListener('click', () => {
  openFolder();
});
