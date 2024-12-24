import { PwdArray } from "./types/pwdTypes"
import { ParamsInterface } from "./types/paramsTypes"

export interface IElectronAPI {
    writeUserPwdData: (value: PwdArray) => Promise<void>,
    getUserPwdData: () => Promise<PwdArray>,
    getStorageFileData: () => Promise<string[]>,
    getFileParams: () => Promise<ParamsInterface>,
    setFileParams: (newParams: ParamsInterface) => void
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}