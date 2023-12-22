const express = require('express');
const app = express()
require('dotenv').config()
const session = require('express-session');
const mongoose = require('mongoose');
const parkingRouter = require('./routers/parking');
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
app.use(express.urlencoded({ extended: false }))


app.use(session({
    secret: process.env.KEY,
    saveUninitialized: false,
    resave: false,
}))
app.use(parkingRouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT, () => { console.log(`App is running on port ${process.env.PORT}`); })