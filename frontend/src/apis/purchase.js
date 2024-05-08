import axios from '../axios'
export const apiGetPurchase = ({ id}) => axios({
    method: 'GET',
    url: `purchase/${id}`,
})

export const apiBuyChapter = ({payload, id}) => axios({
    method: 'POST',
    url: `purchase/${id}`,
    data: {
        comicID: payload
    }
})
export const apiGetAllPurchase = () => axios({
    method: 'GET',
    url: `purchase`
})