import React, { createContext, useEffect, useState } from 'react';

export const GeneralContext = createContext(null);

export default function GeneralContextProvider ({ children }: { children: React.ReactNode }) {
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    if(selectedFile !== ""){
      window.electronAPI.setActiveFile(selectedFile);
    }else{
      window.electronAPI.resetActiveFile();
    }
  }, [selectedFile]);

  return (
    <GeneralContext.Provider value={{ selectedFile, setSelectedFile }}>
      { children }
    </GeneralContext.Provider>
  )
}