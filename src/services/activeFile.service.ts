import { ActiveFileInterface, DEFAULT_FILE, DEFAULT_FILE_DATA } from "../types/mainProcessTypes";

let activeFile = DEFAULT_FILE;
let activeFileData: ActiveFileInterface = DEFAULT_FILE_DATA;

/* function showActualFile(){
    console.log("Active file: ", activeFile);
    console.log("Active Data: ", activeFileData);
} */

// GET
export function getActiveFileName(): string{
    return activeFile;
}

export function getFullActiveFileData(): ActiveFileInterface{
    return activeFileData;
}

export function getActiveFileData<K extends keyof ActiveFileInterface>(objKey: K): ActiveFileInterface[K]{
    return activeFileData[objKey];
}

// SET
export function setActiveFileData<K extends keyof ActiveFileInterface>(objKey: K, newData: ActiveFileInterface[K]): void{
    activeFileData[objKey] = newData;
}

export function updateActiveFile( activeF: string = DEFAULT_FILE, data: ActiveFileInterface = DEFAULT_FILE_DATA): void{
    activeFile = activeF;
    activeFileData = {
        masterKey: data.masterKey,
        params: data.params,
        pwdList: data.pwdList
    }
}