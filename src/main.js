const { app, BrowserWindow, Menu } = require('electron');

let window;

const inputMenu = Menu.buildFromTemplate([
  { role: 'paste' }
]);

function createWindow() {
  window = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile('src/index.html');
  if (process.env.ENV === 'development') {
    window.webContents.openDevTools();
  }
  window.on('closed', () => {
    window = null;
  });

  window.webContents.on('context-menu', (e, props) => {
    const { isEditable } = props;
    if (isEditable) {
      inputMenu.popup(window);
    }
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (window == null) {
    createWindow();
  }
});