import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { PwdArray } from '../types/pwdTypes';

const USER_DATA_PATH = path.join(app.getPath('userData'), 'user_data.json');

export function isDataStored(): boolean{
    return(USER_DATA_PATH !== null || USER_DATA_PATH !== undefined);
}

export function readUserData(): PwdArray{
    try{
        const data = fs.readFileSync(USER_DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch(err){
        console.log('Error retrieving user data in main process: ', err);
        return null;
    }
}

export function writeUserData(data: PwdArray): void{
    fs.writeFileSync(USER_DATA_PATH, JSON.stringify(data));
}