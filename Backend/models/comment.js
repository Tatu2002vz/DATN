const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comic: {
        type: mongoose.Types.ObjectId,
        ref: 'Comic'
    },
    chapter: {
        type: mongoose.Types.ObjectId,
        ref: 'Chapter'
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, //
})


module.exports = mongoose.model('Comment', commentSchema)