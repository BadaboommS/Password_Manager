import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../services/account.service';
import Modal from '../Modal';

const Login = () => {
  const [password, setPassword] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    setFetchError(false);
    setLoadingModal(true);

    accountService.login(password)
      .then(res => {
        accountService.saveToken(res.data.access_token, res.data.user);
        navigate("/account", {replace: true});
      })
      .catch(error => {
        setLoadingModal(false);
        setFetchError(true);
        console.log(error);
      })
  }

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <form className='bg-slate-400 rounded-md p-5 gap-5 border border-solid border-black flex flex-col items-center' onSubmit={handleSubmit}>
          <h2 className='text-2xl'>Login</h2>
          <div className='flex flex-row items-center gap-2'>
            <input className="pl-1" type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete='off'/>
          </div>
          <button type="submit" className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer'>Connexion</button>
        </form>
      </div>
      {fetchError? 
        <div className='fixed bottom-2 w-full flex flex-col justify-center items-center bg-red-500 rounded text-white'>
          <p>Erreur lors de la connexion</p>
          <p>- Veuillez réessayer -</p>
        </div>
      :
        <></>
      }
      <Modal open={loadingModal}>
        <div className='flex flex-col gap-2 items-center'>
          <h2 className='text-2xl bold'>Chargement</h2>
          <p>Chargement des données du serveur...</p>
          <hr className="mx-auto my-4 block sidebar-hr w-1/2" />
          <p>- Le chargement peut prendre un certain temps... (jusqu'à 1-2 minutes) -</p>
          <div className="lds-dual-ring"></div>
          <button onClick={() => setLoadingModal(false)} className='fixed right-20 bottom-20 bg-gray-300 rounded text-red-500 p-2 hover:bg-gray-400 hover:text-dark'>Annuler</button>
        </div>
      </Modal>
    </>
  )
}

export default Login