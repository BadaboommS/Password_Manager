import React, { useState } from 'react'
import { TbEyeOff, TbEye } from "react-icons/tb";
import { PwdItem } from '../../types/pwdTypes';

interface PwdItemPropsInterface{
  item: PwdItem,
  handleEdit: (value: PwdItem) => void,
  handleDelete:(value: PwdItem) => void
}

function PasswordItem({ item = null, handleEdit, handleDelete }: PwdItemPropsInterface) {
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);

    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text);
      }
      
  return (
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
                <span>Edit</span>
                <span>Delete</span>
            </div>
        </td>
    </tr>
  )
}

export default PasswordItem