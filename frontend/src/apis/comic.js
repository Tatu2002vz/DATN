import axios from '../axios'

export const apiGetAllComic = () => axios({
    url: 'comic',
    method: 'GET',
})

export const apiGetComicFilter = (filter) => axios({
    url: 'comic',
    method: 'GET',
    params: filter
})


export const apiGetComic = (id) => axios({
    url: `comic/${id}`,
    method: 'GET'
})