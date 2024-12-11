import { app } from 'electron';
import path from 'path';
import fs from 'fs';

const USER_DATA_PATH = path.join(app.getPath('userData'), 'user_data.json');


export function isDataStored(){
    return(USER_DATA_PATH !== null || USER_DATA_PATH !== undefined);
}

export function readUserData(){
    try{
        const data = fs.readFileSync(USER_DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch(err){
        console.log('Error retrieving user data', err);
        return null;
    }
}

export function writeUserData(data: string){
    console.log(USER_DATA_PATH);
    fs.writeFileSync(USER_DATA_PATH, JSON.stringify(data));
}