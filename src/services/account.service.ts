async function login (password : string): Promise<string> {
    const encodedPassword = window.btoa(password);
    return await window.electronAPI.checkMasterKey(encodedPassword);
}

function saveToken (token: string) {
    localStorage.setItem('sessionToken', token);
}

function logout () {
    localStorage.removeItem('token');
}

function isLogged () {
    const token = localStorage.getItem('sessionToken');
    return !!token
}

export const accountService = {
    login, saveToken, logout, isLogged
}