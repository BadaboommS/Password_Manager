import { app, safeStorage } from 'electron';
import path from 'path';
import fs from 'fs';

const DEFAULT_USER_DATA_PATH = path.join(app.getPath('userData'), 'DataStorage/user_data.json');
const DATA_STORAGE_PATH = path.join(app.getPath('userData'), 'DataStorage');

function displayFunctionName(){
    return displayFunctionName.caller.name
}

export function initMkdir(): void{
    try{
        if(!fs.existsSync(DATA_STORAGE_PATH)){
            fs.mkdirSync(DATA_STORAGE_PATH)
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function getStorageFiles(): string[]{
    try{
        console.log(DATA_STORAGE_PATH);
        return fs.readdirSync(DATA_STORAGE_PATH, { encoding: 'utf-8', withFileTypes: false });
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function createStorageFile(fileName: string): void{
    try{
        const filePath = DATA_STORAGE_PATH + `/${fileName}`;
        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, '');
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function isDataStored(): boolean{
    return(DEFAULT_USER_DATA_PATH !== null || DEFAULT_USER_DATA_PATH !== undefined);
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

export function readUserData(): Buffer{
    try{
        if(isDataStored()){
            const data = fs.readFileSync(DEFAULT_USER_DATA_PATH);
            return data;
        }else{
            return null
        }
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null;
    }
}

export function writeUserData(data: string ): void{
    try{
        const encryptedData = encryptData(data);
        fs.writeFileSync(DEFAULT_USER_DATA_PATH, encryptedData);
    }catch(err){
        console.log(`Something went wrong in ${displayFunctionName()}: ${err.name} - ${err.message}`);
        return null
    }
}

export function getEncryptedInfo(objectKey: string): string {
    try{
      const encryptedData = readUserData();
  
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