import { app, safeStorage } from 'electron';
import path from 'path';
import fs from 'fs';
import { activeFileService } from './activeFile.service';
import { StorageDataInfoInterface, ActiveFileInterface, FullFileInterface, ParamsInterface } from '../types/mainProcessTypes';
import { PwdArray } from '../types/pwdTypes';


// General Functions
function getStoragePath(file: string = ''): string{
    return path.join(app.getPath('userData'), `DataStorage/${file}`);
}

function displayFunctionName(){
    return displayFunctionName.caller.name
}

function isDataStored(file: string = ""): boolean{
    const filePath = getStoragePath(file);
    return(filePath !== null || filePath !== undefined);
}

function isEncryptionAvailable(): boolean{
    try{
        return safeStorage.isEncryptionAvailable();
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

function encryptData(data: string): Buffer{
    try{
        return safeStorage.encryptString(data);
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

function decryptData(encryptedData: Buffer): string{
    try{
        return safeStorage.decryptString(encryptedData);
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

function readUserData(fileName: string): Buffer{
    try{
        if(isDataStored()){
            const data = fs.readFileSync(getStoragePath(fileName));
            return data;
        }else{
            return null
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

function writeUserData(stringData: string, file: string): void{
    try{
        const encryptedData = encryptData(stringData);
        fs.writeFileSync(getStoragePath(file), encryptedData);
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null
    }
}

// File - Data Functions
function initMkdir(): void{
    try{
        if(!fs.existsSync(getStoragePath())){
            fs.mkdirSync(getStoragePath())
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

function createStorageFile(fileName: string): void{
    try{
        const filePath = getStoragePath(fileName);
        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, '');
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

function getStorageFilesInfo(): StorageDataInfoInterface[]{
    try{
        const filesNameArray = fs.readdirSync(getStoragePath(), { encoding: 'utf-8', withFileTypes: false });
        const filesInfoResult = [];
        for(const file of filesNameArray){
            const newFile = {
                fileName: file,
                fileSize: fs.statSync(getStoragePath(file)).size,
                fileModified: fs.statSync(getStoragePath(file)).mtime
            }
            filesInfoResult.push(newFile);
        }
        return filesInfoResult;
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

// Get Info
function getEncryptedInfo<K extends keyof FullFileInterface>(objectKey: K, fileName: string = ""): FullFileInterface[K] {
    try{
        if(fileName === ""){
            fileName = activeFileService.getActiveFileName();
        }
        const encryptedData = readUserData(fileName);
    
        if(encryptedData === null){
            return null
        }else{
            if(isEncryptionAvailable()){
                const decryptedString = decryptData(encryptedData);
                const decryptedInfo = JSON.parse(decryptedString)[objectKey];
                return decryptedInfo;
            }
        }
        }catch(err){
            console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
            return null
        }
}

function getActiveFileEncryptedInfo(selectedFile: string): ActiveFileInterface {
    try{
        const encryptedData = readUserData(selectedFile);
    
        if(encryptedData === null){
            return null
        }else{
            if(isEncryptionAvailable()){
            const decryptedString = decryptData(encryptedData);
            const decryptedInfo = JSON.parse(decryptedString);
            return decryptedInfo;
        }
        }
        }catch(err){
            console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
            return null
        }
}

function checkMasterKey(encodedKey: string, fileName: string): string{
    try{
        const decodedKey = Buffer.from(encodedKey, 'base64').toString(); // atob
        const fileMasterKey = getEncryptedInfo('masterKey', fileName);
    
        if(decodedKey === fileMasterKey){
          return Buffer.from('yes').toString('base64'); //btoa
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null
    }
    
}

// Set Info
function writeUserPwd(pwdData: PwdArray){
    const newActiveData: ActiveFileInterface = { 
        params: activeFileService.getActiveFileData('params'),
        pwdList: pwdData
    };
    const activeFile = activeFileService.getActiveFileName();
    activeFileService.updateActiveFile(activeFile, newActiveData);

    const newFileData: FullFileInterface = {
        masterKey: getEncryptedInfo("masterKey"),
        params: activeFileService.getActiveFileData('params'),
        pwdList: pwdData
    }

    const stringData = JSON.stringify(newFileData);
    writeUserData(stringData, activeFile);
}

function writeUserParams(params: ParamsInterface){
    const newActiveData: ActiveFileInterface = { 
        params: params,
        pwdList: activeFileService.getActiveFileData('pwdList')
    };
    const activeFile = activeFileService.getActiveFileName();
    activeFileService.updateActiveFile(activeFile, newActiveData);

    const newFileData: FullFileInterface = {
        masterKey: getEncryptedInfo("masterKey"),
        params: params,
        pwdList: activeFileService.getActiveFileData('pwdList'),
    }

    const stringData = JSON.stringify(newFileData);
    writeUserData(stringData, activeFile);
}

export const mainServiceFile = {
    isDataStored, isEncryptionAvailable, initMkdir, createStorageFile, getStorageFilesInfo
}

export const mainServiceInfo = {
    getActiveFileEncryptedInfo, checkMasterKey, writeUserPwd, writeUserParams
}