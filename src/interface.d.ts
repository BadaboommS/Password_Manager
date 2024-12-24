import { PwdArray } from "./types/pwdTypes"
import { ParamsInterface } from "./types/paramsTypes"

export interface IElectronAPI {
    writeUserPwdData: (value: PwdArray) => Promise<void>,
    getUserPwdData: () => Promise<PwdArray>,
    getStorageData: () => Promise<string[]>,
    getParams: () => Promise<ParamsInterface>
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}