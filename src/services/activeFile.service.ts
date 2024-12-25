import { PwdArray } from '../types/pwdTypes';
import { ParamsInterface } from '../types/paramsTypes';

export interface FileInterface {
    masterKey: string,
    params: ParamsInterface,
    pwdList: PwdArray
}

const DEFAULT_FILE = '';
const DEFAUT_FILE_DATA: FileInterface = {
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

let activeFile = DEFAULT_FILE;
let activeFileData: FileInterface = DEFAUT_FILE_DATA;

function showActualFile(){
    console.log("Active file: ", activeFile);
    console.log("Active Data: ", activeFileData);
}

// GET
export function getActiveFileName(): string{
    return activeFile;
}

export function getFullActiveFileData(): FileInterface{
    return activeFileData;
}

export function getActiveFileData<K extends keyof FileInterface>(objKey: K): FileInterface[K]{
    return activeFileData[objKey];
}

// SET
export function setActiveFileData<K extends keyof FileInterface>(objKey: K, newData: FileInterface[K]): void{
    activeFileData[objKey] = newData;
}

export function updateActiveFile( activeF: string = DEFAULT_FILE, data: FileInterface = DEFAUT_FILE_DATA): void{
    activeFile = activeF;
    activeFileData = {
        masterKey: data.masterKey,
        params: data.params,
        pwdList: data.pwdList
    }
    showActualFile();
}