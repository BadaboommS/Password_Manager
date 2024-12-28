import { ActiveFileInterface, DEFAULT_FILE, DEFAULT_FILE_DATA } from "../types/mainProcessTypes";

let activeFile = DEFAULT_FILE;
let activeFileData: ActiveFileInterface = DEFAULT_FILE_DATA;

function showActualFile(){
    console.log("Active file: ", activeFile);
    console.log("Active Data: ", activeFileData);
}

// GET
function getActiveFileName(): string{
    return activeFile;
}

function getFullActiveFileData(): ActiveFileInterface{
    return activeFileData;
}

function getActiveFileData<K extends keyof ActiveFileInterface>(objKey: K): ActiveFileInterface[K]{
    return activeFileData[objKey];
}

// SET
function setActiveFileData<K extends keyof ActiveFileInterface>(objKey: K, newData: ActiveFileInterface[K]): void{
    activeFileData[objKey] = newData;
}

function updateActiveFile( activeF: string = DEFAULT_FILE, data: ActiveFileInterface = DEFAULT_FILE_DATA): void{
    activeFile = activeF;
    activeFileData = {
        params: data.params,
        pwdList: data.pwdList
    };
    showActualFile();
}

export const activeFileService = {
    getActiveFileName, getFullActiveFileData, getActiveFileData, setActiveFileData, updateActiveFile
}