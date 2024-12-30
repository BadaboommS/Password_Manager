import React, { useContext } from 'react'
import FileList from './FileList';
import FileLogin from './FileLogin';
import { PublicContext } from '../../context/PublicContextProvider';
import FileMenu from './FileMenu/FileMenu';

export default function Login () {
  const { filesList } = useContext(PublicContext);

  return (
    <>
      {(filesList[0])
        ? <>
            <FileMenu />
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
