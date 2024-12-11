import React, { useState } from 'react'
import { TbEyeOff, TbEye } from "react-icons/tb";
import { PwdItem } from '../../types/pwdTypes';

function PasswordItem({ item = null } : {item: PwdItem}) {
    const [show, setShow] = useState(false);

    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      }
      
  return (
    <tr>
        <td>{item.name}</td>
        <td>{item.website}</td>
        <td>{item.username}</td>
        <td><div className='flex justify-around'><p className={show? '' : 'password_field'}>{item.password}</p><button onClick={() => copyTextToClipboard(item.password)}>Copy</button></div></td>
        <td>{item.comment}</td>
        <td>
            <div>
                <span className='flex justify-around items-center' onClick={() => setShow(!show)}>
                    {show? <TbEye className="absolute mr-10" size={25}/> : <TbEyeOff className="absolute mr-10" size={25}/>}
                </span>
                <span>Edit</span>
                <span>Delete</span>
            </div>
        </td>
    </tr>
  )
}

export default PasswordItem