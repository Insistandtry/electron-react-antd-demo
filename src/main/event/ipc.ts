import { ipcMain, Menu } from 'electron';

function getAsyncMsg() {
    ipcMain.on('async-render', (event, data)=>{
        console.log('this is ipcMain async-render ', Menu.getApplicationMenu());
        event.sender.send('async-reply','haha');
    });

}

export default function handleIPC(){
    getAsyncMsg();

}