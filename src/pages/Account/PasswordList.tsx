import React, { useContext } from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem } from '../../types/pwdTypes'
import { PasswordContext } from '../../context/PasswordContextProvider'

function PasswordList() {
  const { passwordList, setPasswordList } = useContext(PasswordContext);

  function editPasswordEntry(editPwd: PwdItem): void{
    const newPwdArray = [...passwordList];
    const editPwdIndex = newPwdArray.findIndex((obj:PwdItem) => obj.id === editPwd.id);
    newPwdArray[editPwdIndex] = editPwd;
    setPasswordList(newPwdArray);
  }

  function deletePasswordEntry(deletePwdId: number): void{
    const pwdList = [...passwordList];
    const newPwdArray = pwdList.filter((obj: PwdItem) => obj.id !== deletePwdId);
    setPasswordList(newPwdArray);
  }

  return (
    <>
      {(passwordList[0])
        ? (
            <table className='border border-solid border-white border-collapse border-spacing-1 text-left'>
              <caption>Password List</caption>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Name</th>
                  <th>Website</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Notes</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {passwordList.map((pwd: PwdItem, i: number) => {
                      return (pwd !== null) ? <PasswordItem item={pwd} key={i} editPasswordEntry={editPasswordEntry} deletePasswordEntry={deletePasswordEntry}></PasswordItem> : <></>
                })}
              </tbody>
            </table>         
          )         
        : <div>
            <p>Password List is empty !</p>
          </div>
      }
    </>
  )
}

export default PasswordList