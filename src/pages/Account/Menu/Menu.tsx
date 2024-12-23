import { useContext } from 'react';
import { MdSave  } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import AddPasswordFormControl from './AddPasswordFormControl';
import SettingsControl from './SettingsControl';

export default function Menu (){
    const { passwordList, changedSinceLastUpdate, setLastFetchedList } = useContext(AccountContext);
    

    function handlePasswordListChange(): void{
        if(window.confirm("Confirm save ?") === false){
            return null
        }

        window.electronAPI.writeUserPwdData(passwordList);
        setLastFetchedList(passwordList);
    }

    return (
        <>
            <div className='flex'>
                <AddPasswordFormControl />
                <button title={changedSinceLastUpdate? "Save Password List (change detected)" : "Save Password List"} onClick={() => handlePasswordListChange()}>
                    <MdSave size='24' className={changedSinceLastUpdate? "text-yellow-500" : "text-green-500"} />
                </button>
                <SettingsControl />
            </div>
        </>
    )
}