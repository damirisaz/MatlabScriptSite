import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'
import testRoute from './routes/tests.js'

const app = express()
dotenv.config()

// constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// Middleware
app.use(cors())
app.use(express.json())


// Routes
app.use('/api/auth', authRoute)
app.use('/api/tests', testRoute)



async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yfs2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )
        app.listen(3002, () => console.log(`server started on port: ${PORT}`) )
    } catch(error) {
        console.log(error)
    }
}
start()