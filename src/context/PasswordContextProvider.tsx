import React, { createContext, useEffect, useState } from 'react';
import { PwdArray } from '../types/pwdTypes';

interface PasswordContextInterface {
  passwordList: PwdArray,
  setPasswordList: (a: PwdArray) => void,
  changedSinceLastUpdate: boolean,
  setChangedSinceLastUpdate: (a: boolean) => void
}

export const PasswordContext = createContext<PasswordContextInterface>(null);

//const DEF_TEST_CONTEXT = [{"id":0,"name":"Testazz","website":"Test","username":"bada","password":"passwordTest","comment":""},{"id":1,"name":"Test2","website":"Test2","username":"bada2","password":"passwordTest2","comment":""}];

export default function PasswordContextProvider ({ children }: { children: React.ReactNode }) {
  const [passwordList, setPasswordList] = useState<PwdArray>([]);
  const [lastFetchedList, setLastFetchedList] = useState<PwdArray>([]);
  const [changedSinceLastUpdate, setChangedSinceLastUpdate] = useState<boolean>(false);

  const objectsAreEqual = (o1: object, o2: object): boolean => Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => o1[p as keyof typeof o1] === o2[p as keyof typeof o2]);

  useEffect(() => {
    if(passwordList.length === lastFetchedList.length && passwordList.every((o, index) => objectsAreEqual(o, lastFetchedList[index]))){
      setChangedSinceLastUpdate(false);
    }else{
      setChangedSinceLastUpdate(true);
    }
  }, [passwordList]);
  

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
        console.log(`Error in Fetching Context: ${err}`);
      }
    }, []);


  return (
    <PasswordContext.Provider value={{ passwordList, setPasswordList, changedSinceLastUpdate, setChangedSinceLastUpdate }}>
      { children }
    </PasswordContext.Provider>
  )
}