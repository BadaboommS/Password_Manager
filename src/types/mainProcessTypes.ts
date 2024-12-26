import { PwdArray } from "./pwdTypes";

export interface StorageDataInfoInterface {
    fileName: string,
    fileSize: number,
    fileModified: Date
}

export interface ParamsInterface {
    length: number,
    selectedSet: {
        setNumber: boolean,
        setUppercase: boolean,
        setLowercase: boolean,
        setMinus: boolean,
        setUnderline: boolean,
        setSpecial: boolean,
        setBrackets: boolean,
    }
}

// Active File
export interface ActiveFileInterface {
    masterKey: string,
    params: ParamsInterface,
    pwdList: PwdArray
}

export const DEFAULT_FILE = '';
export const DEFAULT_FILE_DATA: ActiveFileInterface = {
    masterKey: "",
    params: {
        length: 20,
        selectedSet: {
            setNumber: true,
            setUppercase: true,
            setLowercase: true,
            setMinus: false,
            setUnderline: false,
            setSpecial: false,
            setBrackets: false,
        }
    },
    pwdList: []
};