export const getToken = () => {
    return window.localStorage.getItem('token')
}

export const setToken = (value) => {
    window.localStorage.setItem('token', value)
}

export const deleteToken = () => {
    window.localStorage.removeItem('token')
}