import { app, BrowserWindow, ipcMain } from 'electron';
import { writeUserData, isEncryptionAvailable, initMkdir, getStorageFilesInfo, getFullEncryptedInfo } from './services/main.service';
import { PwdArray } from './types/pwdTypes';
import { ParamsInterface } from './types/mainProcessTypes';
import { updateActiveFile, getActiveFileData } from './services/activeFile.service';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 800,
    title: "Bada's Password manager",
    icon: "./img/favicon.ico",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true, //Must be true for the context bridge API to work.
      nodeIntegration: true
    },
  });

  mainWindow.setMenu(null); //Hide menu
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY); // Load the index.html of the app.
  mainWindow.webContents.openDevTools(); // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Data Storage function for main process

// Handler => expect a return value for Renderer
ipcMain.handle("getStorageFileData", (e) => {
  try{
    initMkdir();
    return getStorageFilesInfo();
  }catch(err){
    console.log(`Something went wrong in getStorageData main process: ${e} - ${err}`);
    return null
  }
})

ipcMain.handle("getFileParams", (e) => {
  try{
    return getActiveFileData('params');
  }catch(err){
    console.log(`Something went wrong in getFileParams main process: ${e} - ${err}`);
    return null
  }
})

 ipcMain.handle("getUserPwdData", (e) => {
  try{
    return getActiveFileData('pwdList');
  }catch(err){
    console.log(`Something went wrong in getUserPwdData main process: ${e} - ${err}`);
    return null
  }
})

ipcMain.handle("checkMasterKey", (e, encodedKey) => {
  try{
    const decodedKey = Buffer.from(encodedKey, 'base64').toString(); // atob
    const activeFileMasterKey = getActiveFileData('masterKey');

    if(decodedKey === activeFileMasterKey){
      return Buffer.from('yes').toString('base64'); //btoa
    }
  }catch(err){
    console.log(`Something went wrong in checkMasterKey main process: ${e} - ${err}`);
    return null
  }
})

// On => No return value
ipcMain.on("setActiveFile", (e, selectedFile: string) => {
  try{
    console.log(selectedFile);
      const fileData = getFullEncryptedInfo(selectedFile);
      updateActiveFile(selectedFile, fileData);
  }catch(err){
    console.log(`Something went wrong in setActiveFile main process: ${e} - ${err}`);
  }
})

ipcMain.on("resetActiveFile", (e) => {
  try{
    updateActiveFile();
  }catch(err){
    console.log(`Something went wrong in resetActiveFile main process: ${e} - ${err}`);
  }
})

ipcMain.on("writeUserPwdData", (e, pwdData: PwdArray) => {
  try{
    if(isEncryptionAvailable()){
      const newPwdData = { 
        masterKey: getActiveFileData('masterKey'),
        params: getActiveFileData('params'),
        pwdList: pwdData
      };

      writeUserData(JSON.stringify(newPwdData));
    }
  }catch(err){
    console.log(`Something went wrong in writeUserPwdData main process: ${e} - ${err}`);
  }
 });

ipcMain.on("setFileParams", (e, newParams: ParamsInterface) => {
  try{
    if(isEncryptionAvailable()){
      const newPwdData = { 
        masterKey: getActiveFileData('masterKey'),
        params: newParams,
        pwdList: getActiveFileData('pwdList')
      };
      
      writeUserData(JSON.stringify(newPwdData));
    }
  }catch(err){
    console.log(`Something went wrong in writeUserPwdData main process: ${e} - ${err}`);
  }
});