import handleQuit from './quit';
const { nativeTheme } = require('electron');


export default function handleMainWindow(){
    // handleQuit();
    nativeTheme.on('updated', function theThemeHasChanged () {
        console.log('nativeTheme.shouldUseDarkColors ==> ', nativeTheme.shouldUseDarkColors);
        // updateMyAppTheme(nativeTheme.shouldUseDarkColors);
    });
}
