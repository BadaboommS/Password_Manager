import React, { useContext } from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem } from '../../types/pwdTypes'
import { PasswordContext } from '../../context/PasswordContextProvider'

function PasswordList() {
  const { passwordList, setPasswordList } = useContext(PasswordContext);

  function editPasswordEntry(editPwd: PwdItem): void{
    const pwdList = [...passwordList];
    const editPwdIndex = pwdList.findIndex((obj:PwdItem) => obj.id === editPwd.id);
    pwdList[editPwdIndex] = editPwd;
    setPasswordList(pwdList);
  }

  function deletePasswordEntry(deletePwd: PwdItem): void{
    const pwdList = [...passwordList];
    const newPwdArray = pwdList.filter((obj:PwdItem) => obj.id !== deletePwd.id);
    setPasswordList(newPwdArray);
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
              return (pwd !== null) ? <PasswordItem item={pwd} key={i} handleEdit={editPasswordEntry} handleDelete={deletePasswordEntry}></PasswordItem> : <></>
          }))
        : <></>
      }
      </tbody>
    </table>
  )
}

export default PasswordList