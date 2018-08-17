const { app, BrowserWindow, Tray } = require("electron");
const path = require("path");

const iconDirectory = path.join(__dirname, "icons");

let window = undefined;

process.env.GOOGLE_API_KEY = "AIzaSyAjQz5Scgjt8A-n_PKQWjNiYg-ht2gUJts";

app.disableHardwareAcceleration();

app.on("ready", () => {
  createTray();
  createWindow();
});

//Quit the app when the window is closed
app.on("window-all-closed", () => {
  app.quit();
});

const createTray = () => {
  tray = new Tray(path.join(iconDirectory, "if_timeline_2199091.png"));
};

const createWindow = () => {
  window = new BrowserWindow({
    show: true,
    frame: false,
    fullscreen: true,
    icon: path.join(iconDirectory, "if_timeline_2199091.png"),
    webPreferences: {
      //       // Prevents renderer process code from not running when window is
      //       // hidden
      backgroundThrottling: false
    }
  });

  window.loadURL(`file://${path.join(__dirname, "index.html")}`);

  window.show();
};
