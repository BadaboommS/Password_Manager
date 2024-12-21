import { app, safeStorage } from 'electron';
import path from 'path';
import fs from 'fs';

const USER_DATA_PATH = path.join(app.getPath('userData'));
const DATA_STORAGE_PATH = __dirname + '/storage';

export function initMkdir(): void{
    if(!fs.existsSync(DATA_STORAGE_PATH)){
        fs.mkdirSync(DATA_STORAGE_PATH)
    }
}

export function initStorageFile(fileName: string): void{
    const filePath = DATA_STORAGE_PATH + `/${fileName}`;
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(USER_DATA_PATH, '');
    }
}

export async function getStorageFiles(): Promise<string[]>{
    return await fs.readdirSync(DATA_STORAGE_PATH, { encoding: 'utf-8', withFileTypes: false });
}

export function isDataStored(): boolean{
    return(USER_DATA_PATH !== null || USER_DATA_PATH !== undefined);
}

export function isEncryptionAvailable(): boolean{
    return safeStorage.isEncryptionAvailable();
}

export function encryptData(data: string): Buffer{
    return safeStorage.encryptString(data);
}

export function decryptData(encryptedData: Buffer): string{
    return safeStorage.decryptString(encryptedData);
}

export function readUserData(): Buffer{
    try{
        if(isDataStored()){
            const data = fs.readFileSync(USER_DATA_PATH);
            return data;
        }else{
            return null
        }
    } catch(err){
        console.log('Error retrieving user data in main process: ', err);
        return null;
    }
}

export function writeUserData(data: Buffer): void{
    fs.writeFileSync(USER_DATA_PATH, data);
}