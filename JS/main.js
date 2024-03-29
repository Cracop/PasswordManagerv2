// main.js

// Modules to control application life and create native browser window
const { app, Menu, BrowserWindow } = require("electron");
const path = require("path");
const development = false;//Me permite simular los ambientes de desarrollo o producción
//if (require("electron-squirrel-startup")) return;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 720,
    height: 800,
    resizable: development,
    webPreferences: {
      //https://es.stackoverflow.com/questions/432445/electron-uncaught-referenceerror-require-is-not-defined
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  //mainWindow.loadFile("../HTML/index.html");
  mainWindow.loadFile(path.join(__dirname, '../HTML/index.html'));
  //Creates the menu only if im on development
  if (!development) {
    Menu.setApplicationMenu(null);
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//Para exportar la app
// https://www.turtle-techies.com/how-to-package-your-multiplatform-electron-app/
// https://stackoverflow.com/questions/64737348/issue-with-electron-quick-start-guide
