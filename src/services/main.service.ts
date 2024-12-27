import { app, safeStorage } from 'electron';
import path from 'path';
import fs from 'fs';
import { getActiveFileName } from './activeFile.service';
import { StorageDataInfoInterface, ActiveFileInterface, FullFileInterface } from '../types/mainProcessTypes';

function getStoragePath(file: string = ''): string{
    return path.join(app.getPath('userData'), `DataStorage/${file}`);
}

function displayFunctionName(){
    return displayFunctionName.caller.name
}

export function initMkdir(): void{
    try{
        if(!fs.existsSync(getStoragePath())){
            fs.mkdirSync(getStoragePath())
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function getStorageFilesInfo(): StorageDataInfoInterface[]{
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

export function createStorageFile(fileName: string): void{
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

export function isDataStored(file: string = ""): boolean{
    const filePath = getStoragePath(file);
    return(filePath !== null || filePath !== undefined);
}

export function isEncryptionAvailable(): boolean{
    try{
        return safeStorage.isEncryptionAvailable();
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function encryptData(data: string): Buffer{
    try{
        return safeStorage.encryptString(data);
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function decryptData(encryptedData: Buffer): string{
    try{
        return safeStorage.decryptString(encryptedData);
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function readUserData(fileName: string): Buffer{
    try{
        if(isDataStored()){
            const data = fs.readFileSync(path.join(app.getPath('userData'), `DataStorage/${fileName}`));
            return data;
        }else{
            return null
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function writeUserData(data: string): void{
    try{
        const encryptedData = encryptData(data);
        const activeFile = getActiveFileName();
        fs.writeFileSync(getStoragePath(activeFile), encryptedData);
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null
    }
}

export function getEncryptedInfo<K extends keyof FullFileInterface>(objectKey: K): FullFileInterface[K] {
    try{
        const activeFile = getActiveFileName();
        const encryptedData = readUserData(activeFile);
    
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

export function getActiveFileEncryptedInfo(selectedFile: string): ActiveFileInterface {
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