import React, { createContext, useEffect, useState } from 'react';
import { PwdArray } from '../types/pwdTypes';

interface PasswordContextInterface {
  passwordList: PwdArray,
  handlePasswordListChange: (a: PwdArray) => void
}

export const PasswordContext = createContext<PasswordContextInterface>(null);

//const DEF_TEST_CONTEXT = [{"id":0,"name":"Testazz","website":"Test","username":"bada","password":"passwordTest","comment":""},{"id":1,"name":"Test2","website":"Test2","username":"bada2","password":"passwordTest2","comment":""}];

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
        getPwdData().then(d => {
          if(d !== null){
            setPasswordList(d);
          }
        });
      }catch(err){
        console.log(`Error in Context: ${err}`);
      }
    }, []);


  return (
    <PasswordContext.Provider value={{ passwordList, handlePasswordListChange }}>
      { children }
    </PasswordContext.Provider>
  )
}