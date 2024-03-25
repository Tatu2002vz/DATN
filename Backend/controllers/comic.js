const Comic = require('../models/comic')
const asyncHandler = require('express-async-handler')
const sttCode = require('../constants/statusCode')

const slugify = require('slugify')
const createComic = asyncHandler(async(req, res) => {
    const {title, description, coverImage, genre} = req.body
    const {_id} = req.user
    req.body.createdBy = _id
    if(!title || !description || !coverImage || !genre) throw new Error('Missing input')
    req.body.slug = slugify(title)
    const newComic = await Comic.create(req.body)
    return res.status(sttCode.Ok).json({
        success: newComic ? true : false,
        mes: newComic ? newComic : 'Something went wrong!'
    })
})

const getComic = asyncHandler(async (req, res) => {
    const {id} = req.params
    if(!req.params || ! req.params.id) throw new Error('Missing input')
    const comic = await Comic.findByIdAndUpdate(id, {$inc : {viewCount : 1}}, {new: true})
    return res.status(sttCode.Ok).json({
        success: comic ? true : false,
        mes: comic ? comic : 'Something went wrong!'
    })
})

const getComics = asyncHandler(async (req, res) => {
    const comics = await Comic.find()
    return res.status(sttCode.Ok).json({
        success: comics ? true : false,
        mes: comics ? comics : 'Something went wrong'
    })
})

const updateComic = asyncHandler(async (req, res) => {
    const {id} = req.params
    if(!req.params || !req.params.id) throw new Error('Invalid id')
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body.title) req.body.slug = slugify(req.body.title)
    const comic = await Comic.findByIdAndUpdate(id, req.body, {new: true})
    return res.status(sttCode.Ok).json({
        success: comic ? true : false,
        mes: comic ? comic : 'Something went wrong'
    })
})

const deleteComic = asyncHandler(async (req, res) => {
    const {id} = req.params
    if(!req.params || !req.params.id) throw new Error('Invalid id')
    const comic = await Comic.findByIdAndDelete(id)
    return res.status(sttCode.Ok).json({
        success: comic ? true : false,
        mes: comic ? 'Delete Success' : 'Something went wrong'
    })
})
module.exports = {
    createComic,
    getComic,
    getComics,
    deleteComic,
    updateComic,
}