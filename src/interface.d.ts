import { PwdArray, PwdItem } from "./types/pwdTypes"

export interface IElectronAPI {
    addUserPwdData: (value: PwdItem) => Promise<void>,
    getUserPwdData: () => Promise<PwdArray>,
    getUserPwdResponse: (data: PwdArray) => PwdArray
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}