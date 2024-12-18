// See the Electron documentation for details on how to use preload scripts:

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");

// Expose Api for bridge between main and renderer
contextBridge.exposeInMainWorld('electronAPI', {
    writeUserPwdData: (newData: string) => ipcRenderer.send("writeUserPwdData", newData),
    getUserPwdData: () => ipcRenderer.invoke("getUserPwdData")
})