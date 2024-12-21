import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { PublicContext } from '../../context/PublicContextProvider';

const Login = () => {
  const navigate = useNavigate();

  const { filesList } = useContext(PublicContext);

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
    e.preventDefault();
    navigate("/account", {replace: true});
  }

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <form className='bg-slate-400 rounded-md p-5 gap-5 border border-solid border-black flex flex-col items-center' onSubmit={handleSubmit}>
          <h2 className='text-2xl'>Login</h2>
          <button type="submit" className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer'>Connexion</button>
        </form>
      </div>
      <div>
        {(filesList[0])? filesList.map((fileName: string) => <p>{fileName}</p>) : <p>Storage Empty</p>}
      </div>
    </>
  )
}

export default Login