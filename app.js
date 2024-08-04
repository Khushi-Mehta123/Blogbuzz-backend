
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const connectDB = require('./connection/db')
const Users = require('./routers/users')
const Articles = require('./routers/Articles')
const userQueries = require('./routers/contactus')
const admin = require('./routers/admin')

const multer = require('multer')
const path = require('path')

app.use(express.json())
app.use(cors({
    origin : 'http://localhost:4200',
}))

app.use(express.static('ArticlesImages'));
app.use(express.static('UserImages'))
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', Users)
app.use('/api/v1/articles',Articles)
app.use('/api/v1/contactus',userQueries)
app.use('/admin' , admin)


const start = async () => {
    try {
        await connectDB
        console.log("Connectd");
        app.listen(port, () => console.log(`Server Listenong on port ${port}!`))
    } catch (error) {
        console.log(error);
    }
}

start()
