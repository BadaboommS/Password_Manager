import React, { useContext, useState } from 'react'
import Modal from '../../../global/Modal'
import { MdDone, MdCancel, MdAdd } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';

export default function AddPwdControl() {
    const { passwordList, setPasswordList } = useContext(AccountContext);
    const [ showAddPwdForm, setShowAddPwdForm ] = useState(false);

    function handleAddPasswordEntry(e: React.FormEvent<HTMLFormElement>): void{
        e.preventDefault();

        if(window.confirm("Confirm add new password ?") === false){
            return null
        }

        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            name: {value: string};
            website: {value: string};
            username: {value: string};
            password: {value: string};
            comment: {value: string};
        }

        const newPwd = {
            id: passwordList[0]? passwordList[passwordList.length - 1].id + 1 : 0,
            name: formElements.name.value,
            website: formElements.website.value,
            username: formElements.username.value,
            password: formElements.password.value,
            comment: formElements.comment.value
        };

        setShowAddPwdForm(false);

        const newPwdArray = [...passwordList, newPwd];
        setPasswordList(newPwdArray);
    }

    return (
        <>
            <button title="Add New Password" onClick={() => setShowAddPwdForm(true)}>
                <MdAdd size='24'/>
            </button>
            <Modal open={showAddPwdForm}>
                <form onSubmit={(e) => handleAddPasswordEntry(e)}>
                    <input placeholder='Name' type="text" name="name" id="name" required></input>
                    <input placeholder='Website' type="text" name="website" id="website" required />
                    <input placeholder='Username' type="text" name="username" id="username" required />
                    <input placeholder='Password' type="text" name="password" id="password" required />
                    <input placeholder='Comment' type="text" name="comment" id="comment" />
                    <button type="submit" className='ml-1 p-2' title="Confirm"><MdDone size='24'/></button>
                    <button className='p-2' type='reset' onClick={() => setShowAddPwdForm(false)} title="Cancel"><MdCancel size='24'/></button>
                </form>
            </Modal>
        </>
    )
}