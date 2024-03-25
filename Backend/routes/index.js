const userRouter = require('./user')
const comicRouter = require('./comic')
const genreRouter = require('./genre')
const {notFound, errHandler} = require('../middlewares/errHandler');
const { verifyAccessTokenoken} = require('../middlewares/verifyToken');

const initRoutes = (app) => {
    app.use('/api/user', userRouter)

    app.use('/api/comic', comicRouter)

    app.use('/api/genre', genreRouter)
    
    app.use(notFound)
    app.use(errHandler)
}
module.exports = initRoutes