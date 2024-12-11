import React from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem, PwdArray } from '../../types/pwdTypes'

function PasswordList({ list = [] }: { list:PwdArray }) {
  return (
    <table className='border border-solid border-white border-collapse border-spacing-1 text-left'>
      <caption>Password List</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Website</th>
          <th>Username</th>
          <th>Password</th>
          <th>Notes</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {(list[0])
        ? (list.map((pwd: PwdItem, i: number) => {
              return (pwd !== null) ? <PasswordItem item={pwd} key={i}></PasswordItem> : <></>
          }))
        : <></>
      }
      </tbody>
    </table>
  )
}

export default PasswordList