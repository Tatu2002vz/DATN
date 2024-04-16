import axios from "../axios";

export const apiLogin = ({email, password}) => axios({
    url: 'user/login',
    method: 'POST',
    data: {
        email: email,
        password: password
    },
})

export const apiRegister = (payload) => axios({
    url: 'user/register',
    method: 'POST',
    data: payload
})
export const apiForgotPassword = ({email}) => axios({
    url: 'user/forgotpassword',
    method: 'POST',
    data: {
        email: email
    }
})
export const apiGetCurrent = () => axios({
    url: 'user/current',
    method: 'GET',
})

export const apiResetPassword = ({password, tokenPassword}) => axios({
    method: 'PUT',
    url: `user/reset-password/${tokenPassword}`,
    data: {
        password: password
    },
})