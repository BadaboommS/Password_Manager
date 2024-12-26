import React, { useContext } from 'react'
import FileList from './FileList';
import FileLogin from './FileLogin';
import { PublicContext } from '../../context/PublicContextProvider';

export default function Login () {
  const { filesList } = useContext(PublicContext);

  return (
    <>
      {(filesList[0])
        ? <>
            <FileList fileList={ filesList }/>
            <FileLogin />
          </>
        
        : <div>
            <p>Storage Empty</p>
            <button> Add New storage file</button>
          </div>
      }
    </>
  )
}
