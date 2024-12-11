import React, { useContext } from 'react'
import Header from './Header'
import PasswordList from './PasswordList'
import { PasswordContext } from '../../context/PasswordContextProvider'
import { PwdArray } from '../../types/pwdTypes';

function Dashboard() {
    const { passwordList, setPasswordList }: {passwordList: PwdArray, setPasswordList: void} = useContext(PasswordContext);

    /* const test: PwdArray = [
        {
            "id": 0,
            "name": "Test",
            "website": "Test",
            "username": "bada",
            "password": "passwordTest",
            "comment": ""
        },
        {
            "id": 1,
            "name": "Test2",
            "website": "Test2",
            "username": "bada2",
            "password": "passwordTest2",
            "comment": ""
        },
        {
            "id": 2,
            "name": "Test3",
            "website": "Test3",
            "username": "bada3",
            "password": "passwordTest3",
            "comment": ""
        },
    ]; */

    return (
        <div>
            <Header></Header>
            <PasswordList list={ passwordList }></PasswordList>
        </div>
    )
}

export default Dashboard