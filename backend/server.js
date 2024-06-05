require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const gameRoutes = require('./routes/game')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/user')

const app = express()
app.use(cors())
//Parse incoming data
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/game', gameRoutes)
app.use('/review', reviewRoutes)
app.use('/user', userRoutes)

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    app.listen(4000, () => {
        console.log("Listening on port 4000, connected to DB")
    })
})
.catch((error) => {
    console.log(error)
})
