import AddPasswordFormControl from './AddPasswordFormControl';
import SaveControl from './SaveControl';
import SettingsControl from './SettingsControl';

export default function Menu (){
    

    return (
        <>
            <div className='flex'>
                <AddPasswordFormControl />
                <SaveControl />
                <SettingsControl />
            </div>
        </>
    )
}