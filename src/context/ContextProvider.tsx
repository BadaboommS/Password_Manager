import React, { createContext, useState } from 'react'

export const PasswordContext = createContext(null);

export default function ContextProvider ({ children }: { children: React.ReactNode }) {
  const [passwordList, setPasswordList] = useState(null);

  return (
    <PasswordContext.Provider value={{ passwordList, setPasswordList }}>
      { children }
    </PasswordContext.Provider>
  )
}