const asyncHandler = require('express-async-handler');
const Chapter = require('../models/chapter')
const sttCode = require('../enum/statusCode')
const Comment = require('../models/comment')

// const getAllComments = asyncHandler(async(req, res) => {
//     const {id} = req.params;
// })

const getCommentWithIdChapter = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const comments = await Comment.find({chapter: id})
    const count = await Comment.find({chapter: id}).countDocuments();
    return res.status(sttCode.Ok).json({
        success: comments ? true : false,
        count: count,
        res: comments ? comments : 'Something went wrong'
    })
})

const createComment = asyncHandler(async(req, res) => {
    const {id} = req.params
    const {content} = req.body
    const {_id} = req.user
    const chapter = await Chapter.findById(id)
    const data = {
        user: _id,
        comic: chapter.comic,
        content,
        chapter: id
    }
    const newCmt = await Comment.create(data)
    return res.status(sttCode.Ok).json({
        success: newCmt ? true : false,
        mes: newCmt ? newCmt : 'Something went wrong'
    })
})

// const updateComment = asyncHandler(async(req, res) => {
//     const {id} = req.params

    
// })

module.exports = {
    createComment,
    getCommentWithIdChapter
}