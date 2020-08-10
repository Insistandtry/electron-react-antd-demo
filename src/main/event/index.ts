import handleIPC from './ipc';
import handleMainWindow from './mainWindow';

export default function (){
    handleIPC();
    handleMainWindow();
}