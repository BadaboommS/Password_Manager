import React, { useState } from 'react'
import { TbEyeOff, TbEye } from "react-icons/tb";
import { MdCancel, MdDelete, MdDone } from "react-icons/md";
import { PwdItem } from '../../types/pwdTypes';
import Modal from '../../global/Modal';

interface PwdItemPropsInterface{
  item: PwdItem,
  editPasswordEntry: (item: PwdItem) => void,
  deletePasswordEntry: (id: number) => void
}

function PasswordItem({ item = null, editPasswordEntry, deletePasswordEntry }: PwdItemPropsInterface) {
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }

    function handlePwdEdit(e: React.FormEvent<HTMLFormElement>): void{
      e.preventDefault();

      if(window.confirm("Valider la modification") === false){
          return null
      }

      setShowEdit(false);

      const editedPwd = {
        id: item.id,
        name: e.target.name.value,
        website: e.target.website.value,
        username: e.target.username.value,
        password: e.target.password.value,
        comment: e.target.comment.value
      };

      editPasswordEntry(editedPwd);
    }

    function handlePwdDelete(pwdId: number): void{
      if(window.confirm("Valider la suppression ?") === false){
        return null
      }
      
      setShowEdit(false);

      deletePasswordEntry(pwdId);
    }
      
  return (
    <>
      <tr>
        <td>{item.name}</td>
        <td>{item.website}</td>
        <td>{item.username}</td>
        <td><div className='flex justify-around'><p className={showPrivatePassword? '' : 'password_field'}>{item.password}</p><button onClick={() => copyTextToClipboard(item.password)}>Copy</button></div></td>
        <td>{item.comment}</td>
        <td>
            <div>
                <span className='flex justify-around items-center' onClick={() => setShowPrivatePassword(!showPrivatePassword)}>
                    {showPrivatePassword? <TbEye className="absolute mr-10" size={25}/> : <TbEyeOff className="absolute mr-10" size={25}/>}
                </span>
                <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
                <button onClick={() => handlePwdDelete(item.id)}>Delete</button>
            </div>
        </td>
      </tr>
      <Modal open={showEdit}>
        <button className='p-2' onClick={() => handlePwdDelete(item.id)}><MdDelete size='24' /></button>
        <form onSubmit={(e) => handlePwdEdit(e)}>
          <input placeholder='Name' type="text" name="name" id="name" defaultValue={item.name} required></input>
          <input placeholder='Website' type="text" name="website" id="website" defaultValue={item.website} required />
          <input placeholder='Username' type="text" name="username" id="username" defaultValue={item.username} required />
          <input placeholder='Password' type="text" name="password" id="password" defaultValue={item.password} required />
          <input placeholder='Comment' type="text" name="comment" id="comment" defaultValue={item.comment} />
          <button type="submit" className='ml-1 p-2'><MdDone size='24' /></button>
          <button className='p-2' type='reset' onClick={() => setShowEdit(false)}><MdCancel size='24' /></button>
        </form>
      </Modal>
    </>
  )
}

export default PasswordItem