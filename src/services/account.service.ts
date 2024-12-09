import axios from "axios"

export const Axios = axios.create({
    baseURL: 'http://localhost:10000/reservation',
    //baseURL: 'https://reservation-lindeboom-api.onrender.com/reservation',
    timeout: 1000 * 60 * 2
})

let login = (password) => {
    const encodedPassword = window.btoa(password);
    return Axios.post('/login', { password: encodedPassword })
}

let saveToken = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
}

let logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token
}

export const accountService = {
    login, saveToken, logout, isLogged
}