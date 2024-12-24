// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ParamsInterface } from "./types/paramsTypes";
import { ipcRenderer, contextBridge } from "electron";

// Expose Api for bridge between main and renderer
if(process.contextIsolated){
    try{
        contextBridge.exposeInMainWorld('electronAPI', {
            writeUserPwdData: (newData: string) => ipcRenderer.send("writeUserPwdData", newData),
            getUserPwdData: () => ipcRenderer.invoke("getUserPwdData"),
            getStorageFileData: () => ipcRenderer.invoke("getStorageFileData"),
            getFileParams: () => ipcRenderer.invoke("getFileParams"),
            setFileParams: (newParams: ParamsInterface) => ipcRenderer.send("setFileParams", newParams)
        })
    }catch(error){
        console.log(error);
    }
}
