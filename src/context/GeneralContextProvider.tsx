import React, { createContext, useState } from 'react';

export const GeneralContext = createContext(null);

export default function GeneralContextProvider ({ children }: { children: React.ReactNode }) {
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <GeneralContext.Provider value={{ selectedFile, setSelectedFile }}>
      { children }
    </GeneralContext.Provider>
  )
}