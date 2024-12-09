import React from 'react'
import PasswordItem from './PasswordItem'

interface PwdItem {
  id: number,
  name: string,
  website: string,
  username: string,
  password: string,
  comment: string
}

function PasswordList({ pwdList= []} : {pwdList: Array<PwdItem> }) {
  return (
    <ul>
        {pwdList.map((pwd: PwdItem, i: number) => {
            return (pwd !== null) ? <PasswordItem item={pwd} key={i}></PasswordItem> : <></>
        })}
    </ul>
  )
}

export default PasswordList