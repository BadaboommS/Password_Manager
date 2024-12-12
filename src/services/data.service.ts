import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { PwdArray, PwdItem } from '../types/pwdTypes';

const USER_DATA_PATH = path.join(app.getPath('userData'), 'user_data.json');


export function isDataStored(){
    return(USER_DATA_PATH !== null || USER_DATA_PATH !== undefined);
}

export function readUserData():PwdArray{
    try{
        const data = fs.readFileSync(USER_DATA_PATH, 'utf-8');
        console.log(data);
        return JSON.parse(data);
    } catch(err){
        console.log('Error retrieving user data', err);
        return null;
    }
}

export function writeUserData(data: PwdArray){
    fs.writeFileSync(USER_DATA_PATH, JSON.stringify(data));
}

export function editUserData(data: PwdItem){
    const storedData = readUserData();
    const dataIndex = storedData.findIndex((obj:PwdItem) => obj.id == data.id);
    storedData[dataIndex] = data;
    writeUserData(storedData);
}

export function deleteUserData(data: PwdItem){
    const storedData = readUserData();
    const newStoredData = storedData.filter((d) => d.id !== data.id );
    writeUserData(newStoredData);
}