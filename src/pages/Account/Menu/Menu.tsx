import AddPwdControl from './AddPwdControl';
import LogoutControl from './LogoutControl';
import SaveControl from './SaveControl';
import SettingsControl from './SettingsControl';

export default function Menu (){
    
    return (
        <>
            <div className='flex gap-2'>
                <AddPwdControl />
                <SaveControl />
                <SettingsControl />
                <LogoutControl />
            </div>
        </>
    )
}