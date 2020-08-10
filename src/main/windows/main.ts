import { app, BrowserWindow } from "electron";
const urls = require('./../config/url')
const path = require('path');
const isDev = require('electron-is-dev')

let mainWindow: BrowserWindow;

function createWindow() {
  // 每创建一个新的窗口，都是一个独立的进程
  // https://www.electronjs.org/docs/api/browser-window#class-browserwindow
  mainWindow = new BrowserWindow({
    title: 'juno',
    backgroundColor: '#2e2c29',
    height: 700,
    width: 1280,
    // center: true,
    webPreferences: {
      // preload: path.join(__dirname, "./preload.js"),
      webSecurity: false,
      nodeIntegration: true,
      // allowRunningInsecureContent: true
    },
  });

  if(isDev){
    mainWindow.loadURL(urls.devUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }else {
    mainWindow.loadFile(path.join(__dirname, '../render_process/index.html'))
  }

  (global as any).mainId = mainWindow.id;
}

function showMainWindow (){
  if(mainWindow?.isMinimized && mainWindow?.isMinimized()){
    // 将窗口从最小化状态恢复到以前的状态
    mainWindow.restore()
  }
  mainWindow.show()
}

function getMainWindow () {
  return mainWindow
}


module.exports = {
    getMainWindow,
    createWindow,
    showMainWindow
}