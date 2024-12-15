import { app, safeStorage } from 'electron';
import path from 'path';
import fs from 'fs';

const USER_DATA_PATH = path.join(app.getPath('userData'), 'user_data.json');

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
        const data = fs.readFileSync(USER_DATA_PATH);
        return data;
    } catch(err){
        console.log('Error retrieving user data in main process: ', err);
        return null;
    }
}

export function writeUserData(data: Buffer): void{
    fs.writeFileSync(USER_DATA_PATH, data);
}