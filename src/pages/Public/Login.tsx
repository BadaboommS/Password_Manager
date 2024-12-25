import React, { useContext } from 'react'
import FileList from './FileList';
import FileLogin from './FileLogin';
import { PublicContext } from '../../context/PublicContextProvider';

export default function Login () {
  const { filesList } = useContext(PublicContext);
  /* const navigate = useNavigate();

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
    e.preventDefault();
    navigate("/account", {replace: true});
  } */

  return (
    <>
      {(filesList[0])
        ? <>
            <FileList list={filesList}/>
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
