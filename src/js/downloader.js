const path = require('path');
const { PythonShell } = require('python-shell');

module.exports = (url, audioOnly) => {

  let options = {
    mode: 'text',
    args: [url, audioOnly]
  };

  PythonShell.run(path.join(__dirname, '../scripts/download.py'), options, (err) => {
    if (err) throw err;
    console.log('Downloading')
  });
};