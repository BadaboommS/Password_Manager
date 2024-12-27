// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ParamsInterface } from "./types/mainProcessTypes";
import { ipcRenderer, contextBridge } from "electron";

// Expose Api for bridge between main and renderer
if(process.contextIsolated){
    try{
        contextBridge.exposeInMainWorld('electronAPI', {
            // Main.on
            setActiveFile: (fileName: string) => ipcRenderer.send("setActiveFile", fileName),
            resetActiveFile: () => ipcRenderer.send("resetActiveFile"),
            writeUserPwdData: (newData: string) => ipcRenderer.send("writeUserPwdData", newData),
            setFileParams: (newParams: ParamsInterface) => ipcRenderer.send("setFileParams", newParams),

            // Main.handle
            getStorageFileData: () => ipcRenderer.invoke("getStorageFileData"),
            checkMasterKey: (encodedKey: string, fileName: string) => ipcRenderer.invoke("checkMasterKey", encodedKey, fileName),
            getUserPwdData: () => ipcRenderer.invoke("getUserPwdData"),
            getFileParams: () => ipcRenderer.invoke("getFileParams"),
        })
    }catch(error){
        console.log(error);
    }
}
