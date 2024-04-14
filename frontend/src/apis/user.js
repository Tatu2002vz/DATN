import axios from "../axios";

export const apiLogin = ({email, password}) => axios({
    url: 'user/login',
    method: 'POST',
    data: {
        email: email,
        password: password
    },
})
export const apiGetCurrent = () => axios({
    url: 'user/current',
    method: 'POST',

})