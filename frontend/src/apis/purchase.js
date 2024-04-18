import axios from '../axios'
export const apiGetPurchase = ({id}) => axios({
    method: 'GET',
    url: `purchase/${id}`
})

export const apiBuyChapter = ({id}) => axios({
    method: 'POST',
    url: `purchase/${id}`
})