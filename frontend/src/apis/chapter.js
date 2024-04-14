import axios from '../axios'
export const apiGetChapters = (id) => axios({
    url: `chapter/${id}`,
    method: 'GET'
})

export const apiGetChapter = (id) => axios({
    url: `chapter/chap/${id}`,
    method: 'GET'
})

export const apiGetChapterWithSlug = (slug) => axios({
    url: `chapter/chapwithslug/${slug}`,
    method: 'GET'
})
