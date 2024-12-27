async function login (password: string, fileName: string): Promise<string> {
    const encodedPassword = window.btoa(password);
    return await window.electronAPI.checkMasterKey(encodedPassword, fileName);
}

function saveToken (token: string) {
    localStorage.setItem('sessionToken', token);
}

function logout () {
    localStorage.removeItem('sessionToken');
}

function isLogged () {
    const token = localStorage.getItem('sessionToken');
    return !!token
}

export const accountService = {
    login, saveToken, logout, isLogged
}