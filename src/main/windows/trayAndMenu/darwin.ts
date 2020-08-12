/**
 * 最小化到托盘
 */

import { app, BrowserWindow, Tray, Menu } from 'electron';
import path from 'path';

let tray: Tray;

function createTray() {
    const mainWindow = BrowserWindow.fromId(global.mainId);

    tray = new Tray(path.join(global.__maindirname, './../../resources/icon@2x.png'));

    tray.on('click', () => {
        mainWindow.show();
    });

    tray.on('right-click', () => {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: '显示主界面', click: () => {
                    mainWindow.show();
                    mainWindow.setSkipTaskbar(false);
                }
            },
            {
                label: '退出', click: () => {
                    mainWindow.destroy();
                    app.quit();
                }
            }
        ]);

        tray.setContextMenu(contextMenu);
    });
}

function createAppMenu (){
    const appMenu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    label: 'About',
                    click: ()=>{}
                },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]

        },
        { role: 'fileMenu' },
        { role: 'windowMenu' },
        { role: 'editMenu' }
    ]);

    app.applicationMenu = appMenu;
}

app.whenReady().then(() => {
    createTray();
    createAppMenu();
});
