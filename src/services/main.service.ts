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

function logError(error: unknown) {
    // Si l'erreur a une stack trace (ce qui est souvent le cas pour des erreurs de type Error)
    if (error instanceof Error) {
        // Extraire la pile d'appel à partir de l'exception
        const stackTrace = error.stack.split("\n");

        // Le nom de la fonction appelante est généralement sur la deuxième ligne de la stack trace
        const callerFunction = stackTrace[1] ? stackTrace[1].trim() : "Inconnu";

        // Afficher l'erreur avec des informations complémentaires
        console.error(`Erreur capturée dans ${callerFunction}:`);
        console.error(`Error Name: ${error.name}`);
        console.error(`Message: ${error.message}`);
        console.error(`Stack trace: ${error.stack}`);
    } else {
        console.error("Erreur sans stack trace ou de type inconnu:", error);
    }
}

function isDataStored(file: string = ""): boolean{
    try{
        const filePath = getStoragePath(file);
        return(filePath !== null || filePath !== undefined);
    }catch(err){
        logError(err);
        return null
    }
}

function isEncryptionAvailable(): boolean{
    try{
        return safeStorage.isEncryptionAvailable();
    }catch(err){
        logError(err);
        return null;
    }
}

function encryptData(data: string): Buffer{
    try{
        return safeStorage.encryptString(data);
    }catch(err){
        logError(err);
        return null;
    }
}

function decryptData(encryptedData: Buffer): string{
    try{
        return safeStorage.decryptString(encryptedData);
    }catch(err){
        logError(err);
        return null;
    }
}

function readUserData(fileName: string): Buffer{
    try{
        return isDataStored()? fs.readFileSync(getStoragePath(fileName)) : null;
    }catch(err){
        logError(err);
        return null;
    }
}

function writeUserData(stringData: string, file: string): void{
    try{
        const encryptedData = encryptData(stringData);
        fs.writeFileSync(getStoragePath(file), encryptedData);
    }catch(err){
        logError(err);
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
        logError(err);
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
        logError(err);
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
        logError(err);
        return null;
    }
}

function generateToken(): string{
    //To do
    return Buffer.from("yes").toString('base64');
}

function checkToken(token: string): boolean{
    try{
        const activeToken = activeFileService.getActiveFileToken();
        return token === activeToken;
    }catch(err){
        logError(err);
        return null
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
            logError(err);
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
            logError(err);
            return null
        }
}

function checkMasterKey(encodedKey: string, fileName: string): string{
    try{
        const decodedKey = Buffer.from(encodedKey, 'base64').toString(); // atob
        const fileMasterKey = getEncryptedInfo('masterKey', fileName);
    
        if(decodedKey === fileMasterKey){
            const token = generateToken();
            activeFileService.setActiveFileToken(token);
            return token;
        }
    }catch(err){
        logError(err);
        return null
    }
    
}

// Set Info
function writeUserPwd(pwdData: PwdArray){
    try{
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
    }catch(err){
        logError(err);
    }
    
}

function writeUserParams(params: ParamsInterface){
    try{
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
    }catch(err){
        logError(err);
    }
}

export const mainServiceFile = {
    isDataStored, isEncryptionAvailable, initMkdir, createStorageFile, getStorageFilesInfo
}

export const mainServiceInfo = {
    generateToken, checkToken, getActiveFileEncryptedInfo, checkMasterKey, writeUserPwd, writeUserParams
}