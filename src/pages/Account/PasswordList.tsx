import React from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem, PwdArray } from '../../types/pwdTypes'

function PasswordList({list = []}: {list:PwdArray}) {
  return (
    <ul>
        {(list[0])
        ? (list.map((pwd: PwdItem, i: number) => {
              return (pwd !== null) ? <PasswordItem item={pwd} key={i}></PasswordItem> : <></>
          }))
        : <></>
      }
    </ul>
  )
}

export default PasswordList