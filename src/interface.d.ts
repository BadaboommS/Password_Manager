import { PwdArray } from "./types/pwdTypes"

export interface IElectronAPI {
    writeUserPwdData: (value: PwdArray) => Promise<void>,
    getUserPwdData: () => Promise<PwdArray>,
    getStorageData: () => Promise<string[]>
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}