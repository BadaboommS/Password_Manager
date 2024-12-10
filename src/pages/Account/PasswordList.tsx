import React from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem, PwdArray } from '../../types/pwdTypes'

function PasswordList({ pwdList= []} : {pwdList: PwdArray }) {
  return (
    <ul>
        {pwdList.map((pwd: PwdItem, i: number) => {
            return (pwd !== null) ? <PasswordItem item={pwd} key={i}></PasswordItem> : <></>
        })}
    </ul>
  )
}

export default PasswordList