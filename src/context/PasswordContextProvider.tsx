import React, { createContext, useState } from 'react'
import { PwdArray } from '../types/pwdTypes';

export const PasswordContext = createContext(null);

export default function PasswordContextProvider ({ children }: { children: React.ReactNode }) {
  const [passwordList, setPasswordList] = useState<PwdArray>([
    {
        "id": 0,
        "name": "Test",
        "website": "Test",
        "username": "bada",
        "password": "passwordTest",
        "comment": ""
    },
    {
        "id": 1,
        "name": "Test2",
        "website": "Test2",
        "username": "bada2",
        "password": "passwordTest2",
        "comment": ""
    },
    {
        "id": 2,
        "name": "Test3",
        "website": "Test3",
        "username": "bada3",
        "password": "passwordTest3",
        "comment": ""
    },
]);


  return (
    <PasswordContext.Provider value={{ passwordList, setPasswordList }}>
      { children }
    </PasswordContext.Provider>
  )
}