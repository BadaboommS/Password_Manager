import { PwdArray } from "./types/pwdTypes"
import { ParamsInterface } from "./types/paramsTypes"

export interface IElectronAPI {
    // Main.on
    setActiveFile: (fileName: string) => void,
    resetActiveFile: () => void,
    writeUserPwdData: (value: PwdArray) => Promise<void>,
    setFileParams: (newParams: ParamsInterface) => void,

    // Main.handle
    getStorageFileData: () => Promise<string[]>,
    checkMasterKey: (encodedKey: string) => Promise<string>,
    getUserPwdData: () => Promise<PwdArray>,
    getFileParams: () => Promise<ParamsInterface>,    
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}