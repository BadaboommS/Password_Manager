import { PwdArray } from "./types/pwdTypes"

export interface IElectronAPI {
    writeUserPwdData: (value: PwdArray) => Promise<void>,
    getUserPwdData: () => Promise<PwdArray>,
    //getUserPwdResponse: (data: PwdArray) => PwdArray
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}