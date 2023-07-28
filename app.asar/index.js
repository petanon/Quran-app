electron = require('electron');

path = require("path");
const { app, globalShortcut, BrowserWindow, Menu, ipcMain, ipcRenderer, dialog, shell } = electron;


app.on('second-instance', (event, commandLine, workingDirectory) => {
  main.show_window()
})

dev = false
global.createWindow = async () => {
  splashWindow = new BrowserWindow({
    width: 500,
    height: 250,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(app.getAppPath(), 'splash/splashpreload.js')
    }
    , show: false,
    resizable: false,
    transparent: true
  });
  splashWindow.once('ready-to-show', () => {
    splashWindow.show()
  })

  splashWindow.loadURL(path.join(__dirname, 'splash/splash.html'));
  splashWindow.webContents.setWindowOpenHandler(({ url }) => {
    return { action: 'deny' }
  })

  Menu.setApplicationMenu(null);
  if (dev) splashWindow.toggleDevTools()
  splashWindow.on("closed", function () {
    app.quit()
  })
}
if (app.isReady()) createWindow()
else app.on('ready', createWindow);


main = require('../scriptapp.asar/main')
main.main(main_callback)