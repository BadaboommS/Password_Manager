/* export const Axios = axios.create({
    baseURL: 'http://localhost:10000/reservation',
    //baseURL: 'https://reservation-lindeboom-api.onrender.com/reservation',
    timeout: 1000 * 60 * 2
})

const login = (password : string) => {
    const encodedPassword = window.btoa(password);
    return Axios.post('/login', { password: encodedPassword })
}

const saveToken = (token: string, user: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

const isLogged = () => {
    const token = localStorage.getItem('token');
    return !!token
}

export const accountService = {
    login, saveToken, logout, isLogged
} */