const express = require("express")
const cors = require('cors')

//Routes import
const authRouter = require("./routes/authRoute.js")
const uploadImageRouter = require("./routes/uploadImageRoute.js")
const getImageRouter = require('./routes/getImageRoute.js')

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


//routes
app.use('/api/v1', authRouter)
app.use('/api/v1', uploadImageRouter)
app.use('/api/v1', getImageRouter)


module.exports = { app }