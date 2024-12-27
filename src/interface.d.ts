import { PwdArray } from "./types/pwdTypes"
import { ParamsInterface, StorageDataInfoInterface } from "./types/mainProcessTypes"

export interface IElectronAPI {
    // Main.on
    setActiveFile: (fileName: string) => void,
    resetActiveFile: () => void,
    writeUserPwdData: (value: PwdArray) => Promise<void>,
    setFileParams: (newParams: ParamsInterface) => void,

    // Main.handle
    getStorageFileData: () => Promise<StorageDataInfoInterface[]>,
    checkMasterKey: (encodedKey: string, fileName: string) => Promise<string>,
    getUserPwdData: () => Promise<PwdArray>,
    getFileParams: () => Promise<ParamsInterface>,    
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}