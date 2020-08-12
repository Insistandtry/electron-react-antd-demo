import { app, BrowserWindow } from 'electron';
import handleEvents from './event';
import createDock from './windows/dock';
import {createWindow, showMainWindow} from './windows/main';

declare global {
    namespace NodeJS {
      interface Global {
        __maindirname: string;
        mainId: number
      }
    }
}

// 安装过程中不会自动运行，安装完成后才会自动运行
if(require('electron-squirrel-startup')) {
    app.quit();
}

global.__maindirname = __dirname;

const gotTheLock = app.requestSingleInstanceLock();
// 如果没有成功取了锁，则立即退出

if(!gotTheLock){
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // 当运行第二个实例时,将会聚焦到myWindow这个窗口
        showMainWindow();
    });

    app.on('ready', () => {
        createWindow();
        createDock();
        require('./windows/trayAndMenu');
        handleEvents();
    });

    app.on('activate', function fn() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
