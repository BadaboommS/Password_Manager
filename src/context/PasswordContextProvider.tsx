import React, { createContext, useEffect, useState } from 'react';
import { PwdArray } from '../types/pwdTypes';

interface PasswordContextInterface {
  passwordList: PwdArray,
  setPasswordList: (a: PwdArray) => void,
  changedSinceLastUpdate: boolean,
  setLastFetchedList: (a: PwdArray) => void
}

export const PasswordContext = createContext<PasswordContextInterface>(null);

//const DEF_TEST_CONTEXT = [{"id":0,"name":"Testazz","website":"Test","username":"bada","password":"passwordTest","comment":""},{"id":1,"name":"Test2","website":"Test2","username":"bada2","password":"passwordTest2","comment":""}];

export default function PasswordContextProvider ({ children }: { children: React.ReactNode }) {
  const [passwordList, setPasswordList] = useState<PwdArray>([]);
  const [lastFetchedList, setLastFetchedList] = useState<PwdArray>([]);
  const [changedSinceLastUpdate, setChangedSinceLastUpdate] = useState<boolean>(false);

  const objectsAreEqual = (o1: object, o2: object): boolean => Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => o1[p as keyof typeof o1] === o2[p as keyof typeof o2]);
  const arrayOfObjAreEqual = (arr1 : Array<object>, arr2: Array<object>): boolean => arr1.length === arr2.length && arr1.every((o, index) => objectsAreEqual(o, arr2[index]));
  
  useEffect(() => {
    if(arrayOfObjAreEqual(passwordList, lastFetchedList)){
      setChangedSinceLastUpdate(false);
    }else{
      setChangedSinceLastUpdate(true);
    }
  }, [passwordList, lastFetchedList]);
  

  async function getPwdData(){
    return await window.electronAPI.getUserPwdData();
  }

  useEffect(() => {
      try{
        getPwdData().then(fetchedData => {
          if(fetchedData !== null){
            setPasswordList(fetchedData);
            setLastFetchedList(fetchedData);
            setChangedSinceLastUpdate(false);
          }
        });
      }catch(err){
        console.log(`Error in Password Fetching Context: ${err}`);
      }
    }, []);


  return (
    <PasswordContext.Provider value={{ passwordList, setPasswordList, changedSinceLastUpdate, setLastFetchedList }}>
      { children }
    </PasswordContext.Provider>
  )
}