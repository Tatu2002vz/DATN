const userRouter = require('./user')
const comicRouter = require('./comic')
const genreRouter = require('./genre')
const purchaseRouter = require('./purchase')
const chapterRouter = require('./chapter')
const commentRouter = require('./comment')
const insertRouter = require('./insertData')
const {notFound, errHandler} = require('../middlewares/errHandler');
const { verifyAccessTokenoken} = require('../middlewares/verifyToken');

const initRoutes = (app) => {
    app.use('/api/user', userRouter)

    app.use('/api/comic', comicRouter)

    app.use('/api/genre', genreRouter)

    app.use('/api/purchase', purchaseRouter)

    app.use('/api/chapter', chapterRouter)
    
    app.use('/api/comment', commentRouter)
    
    app.use('/api/insert', insertRouter)

    app.use(notFound)
    app.use(errHandler)
}
module.exports = initRoutes