import { PwdArray } from "./types/pwdTypes"
import { ParamsInterface, StorageDataInfoInterface } from "./types/mainProcessTypes"

export interface IElectronAPI {
    // Main.on
    setActiveFile: (fileName: string) => void,
    resetActiveFile: () => void,
    writeUserPwdData: (value: PwdArray, token: string) => Promise<void>,
    setFileParams: (newParams: ParamsInterface, token: string) => void,

    // Main.handle
    getStorageFileData: () => Promise<StorageDataInfoInterface[]>,
    checkMasterKey: (encodedKey: string, fileName: string) => Promise<string>,
    getUserPwdData: (token: string) => Promise<PwdArray>,
    getFileParams: (token: string) => Promise<ParamsInterface>,    
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}