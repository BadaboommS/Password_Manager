import React, { useState } from 'react'
import { TbEyeOff, TbEye } from "react-icons/tb";
import { PwdItem } from '../../types/pwdTypes';

function PasswordItem({ item = null } : {item: PwdItem}) {
    const [show, setShow] = useState(false);

  return (
    <li>
        <div className='flex'>
            <p>
                {item.name}
            </p>
            -
            <p>
                {item.website}
            </p>
            - 
            <p>
                {item.username}
            </p>
            -
            <p className={show? '' : 'password_field'}>
                {item.password}
            </p>
            -
            <p>
                {item.comment}
            </p>
        </div>
        <div>
            <span className='flex justify-around items-center' onClick={() => setShow(!show)}>
                {show? <TbEye className="absolute mr-10" size={25}/> : <TbEyeOff className="absolute mr-10" size={25}/>}
            </span>
        </div>
    </li>
  )
}

export default PasswordItem