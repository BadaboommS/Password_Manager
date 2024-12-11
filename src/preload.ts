// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");

// Expose Api for bridge between main and renderer
contextBridge.exposeInMainWorld('electronAPI', {
    saveText: (value: string) => ipcRenderer.send("saveText", value),
})