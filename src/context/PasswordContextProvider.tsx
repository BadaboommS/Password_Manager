import React, { createContext, SetStateAction, useEffect, useState } from 'react';
import { PwdArray } from '../types/pwdTypes';

interface PasswordContextInterface {
  passwordList: PwdArray,
  setPasswordList: React.Dispatch<SetStateAction<PwdArray>>
}

export const PasswordContext = createContext<PasswordContextInterface>(null);

export default function PasswordContextProvider ({ children }: { children: React.ReactNode }) {
  const [passwordList, setPasswordList] = useState<PwdArray>([]);
  
  async function getPwdData(){
    return await window.electronAPI.getUserPwdData();
  }
  
  useEffect(() => {
      try{
        getPwdData().then(d => setPasswordList(d));
      }catch(err){
        console.log(`Error in Context component ${err}`);
      }
    }, []);


  return (
    <PasswordContext.Provider value={{ passwordList, setPasswordList }}>
      { children }
    </PasswordContext.Provider>
  )
}