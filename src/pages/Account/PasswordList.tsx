import React, { useContext, useState } from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem } from '../../types/pwdTypes'
import { PasswordContext } from '../../context/PasswordContextProvider'

function PasswordList() {
  const { passwordList, handlePasswordListChange } = useContext(PasswordContext);
  const { showAddPwdForm, setShowAddPwdForm } = useState(false);

  function handleAddPasswordEntry(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();

      if(window.confirm("Valider la modification") === false){
          return null
      }

      const form = e.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        name: {value :string};
        website: {value :string};
        username: {value :string};
        password: {value :string};
        comment: {value :string};
      }

      const newPwd = {
        id: passwordList[0]? passwordList[passwordList.length - 1].id : 0,
        name: formElements.name.value,
        website: formElements.website.value,
        username: formElements.username.value,
        password: formElements.password.value,
        comment: formElements.comment.value
      };

      setShowAddPwdForm(false);

      const newPwdArray = [...passwordList, newPwd];
      handlePasswordListChange(newPwdArray);
  }

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
        : <>
            <tr>
              <th>Password List is empty !</th>
            </tr>
          </>
      }
      </tbody>
    </table>
  )
}

export default PasswordList