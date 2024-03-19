const express = require('express');
require('dotenv').config()
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8888
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
dbConnect();
initRoutes(app)
app.use('/', (req, res) => {
    res.send('hahaha')
})


app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})