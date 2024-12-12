import React, { useContext } from 'react'
import Header from './Header'
import PasswordList from './PasswordList'
import { PasswordContext } from '../../context/PasswordContextProvider'
import { PwdArray, PwdItem } from '../../types/pwdTypes';

function Dashboard() {
    const { passwordList, setPasswordList }: {passwordList: PwdArray, setPasswordList: void} = useContext(PasswordContext);

    /* function handlePasswordEdit(pwd:PwdItem){

    } */

    /* function handlePasswordDelete(pwd:PwdItem){

    } */

    return (
        <div>
            <Header></Header>
            <PasswordList list={ passwordList }></PasswordList>
        </div>
    )
}

export default Dashboard