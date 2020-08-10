import { app, Menu, BrowserWindow } from 'electron';

export default function createDock () {
    const mainWindow = BrowserWindow.fromId((global as any).mainId),
        dockMenu = Menu.buildFromTemplate([
            {
                label: '打开窗口',
                click () {
                    mainWindow.show();
                }
            }
        ]);

    app.dock.setMenu(dockMenu);
}

