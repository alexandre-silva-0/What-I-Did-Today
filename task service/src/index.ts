import express from 'express'
import dotenv from 'dotenv'
import database from './config/database.js'
import taskRouters from './routes/TaskRoutes.js'
import cors from 'cors'


const app = express()
dotenv.config()

//config
app.use(express.json())
app.use(cors({
    origin: [
        'http://192.168.1.11:3000',
        'http://localhost:3000',
        'https://widt.oasis-server.com.br',
        'https://widt-back.oasis-server.com.br/'
    ],
    credentials: true
}))

app.use(taskRouters)

const startServer = async () => {
    try {
        database
            .sync()
            .then(() => {
                app.listen(process.env.PORT)
                console.log('Listening on ', process.env.PORT)
            })
    } catch (error) {
        console.error("Unable to initiate server. Error: ", error)
    }
}

startServer()