require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
//Parse incoming data
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    app.listen(4000, () => {
        console.log("Listening on port 4000, connected to DB")
    })
})
.catch((error) => {
    console.log(error)
})
