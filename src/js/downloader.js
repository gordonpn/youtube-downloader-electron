document.getElementById('link-input').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

function downloadYoutube() {
  let re = new RegExp('^((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube\\.com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)?$');
  let url_link = document.getElementById('link-input').value;
  let input_element = document.getElementById('link-input');
  let updates_element = document.getElementById("updates");
  console.log(url_link);

  let match = re.exec(url_link);

  function show_error() {
    let error_alert = document.createElement('div');
    error_alert.className = "uk-alert-danger";
    let para = document.createElement('p');
    para.textContent = "Link is not valid";
    let close_button = document.createElement('a');
    close_button.className = "uk-alert-close";
    close_button.setAttribute("uk-close", "");
    error_alert.appendChild(close_button);
    error_alert.appendChild(para);
    updates_element.appendChild(error_alert);

    setTimeout(() => {
      UIkit.alert(error_alert).close();
    }, 10000)
  }

  function show_success() {
    let success_alert = document.createElement('div');
    success_alert.className = "uk-alert-success";
    let para = document.createElement('p');
    para.textContent = "Downloading!";
    let close_button = document.createElement('a');
    close_button.className = "uk-alert-close";
    close_button.setAttribute("uk-close", "");
    success_alert.appendChild(close_button);
    success_alert.appendChild(para);
    updates_element.appendChild(success_alert);

    setTimeout(() => {
      UIkit.alert(success_alert).close();
    }, 10000)
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

    show_success();

    setTimeout(() => {
      input_element.className = 'uk-input uk-form-width-medium uk-form-large uk-width-1-2 uk-align-center';
      input_element.value = '';
    }, 10000);
  }
}
