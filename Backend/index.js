const express = require('express');
require('dotenv').config()
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 8888
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
  }));  


dbConnect();
initRoutes(app)
app.use('/', (req, res) => {
    res.send('hahaha')
})


app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})