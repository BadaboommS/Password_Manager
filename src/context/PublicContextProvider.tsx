import React, { createContext, useEffect, useState } from 'react';

export const PublicContext = createContext(null);

export default function PublicContextProvider ({ children }: { children: React.ReactNode }) {
  const [filesList, setFilesList] = useState<string[]>([]);

  async function getStorageData(){
    return await window.electronAPI.getStorageData();
  }

  useEffect(() => {
      try{
        getStorageData().then(fetchedData => {
          if(fetchedData !== null){
            setFilesList(fetchedData);
          }
        });
      }catch(err){
        console.log(`Error in Public Fetching Context: ${err}`);
      }
    }, []);


  return (
    <PublicContext.Provider value={{ filesList }}>
      { children }
    </PublicContext.Provider>
  )
}