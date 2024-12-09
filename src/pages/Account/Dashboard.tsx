import React from 'react'
import Header from './Header'
import PasswordList from './PasswordList'

interface PwdItem {
    id: number,
    name: string,
    website: string,
    username: string,
    password: string,
    comment: string
}

function Dashboard() {

    const pwdList: Array<PwdItem> = [
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
    ];

    return (
        <div>
            <Header></Header>
            <PasswordList pwdList={ pwdList }></PasswordList>
        </div>
    )
}

export default Dashboard