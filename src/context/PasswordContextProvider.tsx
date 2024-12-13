import React, { createContext, SetStateAction, useEffect, useState } from 'react';
import { PwdArray } from '../types/pwdTypes';

interface PasswordContextInterface {
  passwordList: PwdArray,
  handlePasswordListChange: (a: PwdArray) => void,
  //setPasswordList: React.Dispatch<SetStateAction<PwdArray>>
}

export const PasswordContext = createContext<PasswordContextInterface>(null);

export default function PasswordContextProvider ({ children }: { children: React.ReactNode }) {
  const [passwordList, setPasswordList] = useState<PwdArray>([]);

  function handlePasswordListChange(newPwdArray: PwdArray){
    setPasswordList(newPwdArray);
    window.electronAPI.writeUserPwdData(newPwdArray);
  }
  
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
    <PasswordContext.Provider value={{ passwordList, handlePasswordListChange }}>
      { children }
    </PasswordContext.Provider>
  )
}