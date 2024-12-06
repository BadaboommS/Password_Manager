import React from 'react'
import Header from './Header'
import PasswordList from './PasswordList'

interface PwdItem {
    id: number,
    website: string,
    username: string,
    password: string
}

function Dashboard() {

    const pwdList: Array<PwdItem> = [
        {
            "id": 0,
            "website": "Test",
            "username": "bada",
            "password": "passwordTest"
        },
        {
            "id": 1,
            "website": "Test2",
            "username": "bada2",
            "password": "passwordTest2"
        },
        {
            "id": 2,
            "website": "Test3",
            "username": "bada3",
            "password": "passwordTest3"
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