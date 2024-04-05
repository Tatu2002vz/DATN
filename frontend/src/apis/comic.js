import axios from '../axios'

export const apiGetAllComic = () => axios({
    url: 'comic',
    method: 'GET',
})

export const apiGetLastChapter = (id) => axios({

    url: `chapter/${id}`,
    method: 'GET'
})
