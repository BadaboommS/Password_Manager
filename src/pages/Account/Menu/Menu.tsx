import AddPasswordFormControl from './AddPasswordFormControl';
import LogoutControl from './LogoutControl';
import SaveControl from './SaveControl';
import SettingsControl from './SettingsControl';

export default function Menu (){
    

    return (
        <>
            <div className='flex gap-2'>
                <AddPasswordFormControl />
                <SaveControl />
                <SettingsControl />
                <LogoutControl />
            </div>
        </>
    )
}