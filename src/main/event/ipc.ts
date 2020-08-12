import { ipcMain, Menu, Notification } from 'electron';

function getAsyncMsg() {
    ipcMain.on('async-render', (event)=>{
        console.log('this is ipcMain async-render ', Menu.getApplicationMenu());
        event.sender.send('async-reply', 'haha');
    });

    ipcMain.on('async-render', (event)=>{
        console.log('this is ipcMain async-render ', Menu.getApplicationMenu());
        event.sender.send('async-reply', 'haha');
    });

}

function showNotification() {
    ipcMain.on('notification', (event, args) => {
        console.log('notification event, arg ==> ', event, args);
        const options = {
            title: args?.title,
            body: args
        };
        let notification = new Notification(options);

        notification.show();
    });
}

export default function handleIPC(){
    getAsyncMsg();
    showNotification();
}
