import { app, BrowserWindow, dialog, ipcMain } from 'electron';


let isQuit = false;

function checkQuit(mainWindow: BrowserWindow, event: Electron.Event) {
    const options = {
        type: 'info',
        title: '关闭确认',
        message: '确认要最小化程序到托盘吗？',
        buttons: ['确认', '关闭程序'],
        canceled: true
    };
    // res { response: 0, checkboxChecked: false } 0-确认 1-关闭

    dialog.showMessageBox(mainWindow, options).then((res)=>{
        const { response } = res;

        if (response === 0) {
            event.preventDefault();
            mainWindow.hide();
        } else {
            isQuit = true;
            mainWindow = null;
            app.exit(0);
        }
    });
}

function handleQuit() {
    const mainWindow = BrowserWindow.fromId((global as any).mainId);

    mainWindow.on('close', event => {
        event.preventDefault();
        checkQuit(mainWindow, event);
    });

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
        if (!isQuit) {
            if (process.platform !== 'darwin') {
                isQuit = true;
                ipcMain.removeAllListeners();
                app.quit();
            }
        }
    });
}

export default handleQuit;