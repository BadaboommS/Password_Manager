import React, { useContext } from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem } from '../../types/pwdTypes'
import { PasswordContext } from '../../context/PasswordContextProvider'

function PasswordList() {
  const { passwordList, handlePasswordListChange } = useContext(PasswordContext);

  function editPasswordEntry(editPwd: PwdItem): void{
    const newPwdArray = [...passwordList];
    const editPwdIndex = newPwdArray.findIndex((obj:PwdItem) => obj.id === editPwd.id);
    newPwdArray[editPwdIndex] = editPwd;
    handlePasswordListChange(newPwdArray);
  }

  function deletePasswordEntry(deletePwdId: number): void{
    const pwdList = [...passwordList];
    const newPwdArray = pwdList.filter((obj:PwdItem) => obj.id !== deletePwdId);
    handlePasswordListChange(newPwdArray);
  }

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
        {(passwordList[0])
        ? (passwordList.map((pwd: PwdItem, i: number) => {
              return (pwd !== null) ? <PasswordItem item={pwd} key={i} editPasswordEntry={editPasswordEntry} deletePasswordEntry={deletePasswordEntry}></PasswordItem> : <></>
          }))
        : <></>
      }
      </tbody>
    </table>
  )
}

export default PasswordList