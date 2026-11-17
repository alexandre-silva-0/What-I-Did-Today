import express from 'express'
import dotenv from 'dotenv'
import database from './config/database.js'
import taskRouters from './routes/TaskRoutes.js'
import cors from 'cors'


const app = express()
dotenv.config()

//config
app.use(express.json())
// Só para desenvolvimento: em produção o front chama /api no mesmo domínio (via Nginx)
app.use(cors({
    origin: [
        'http://192.168.1.11:3000',
        'http://localhost:3000',
    ],
}))

app.use(taskRouters)

const PORT = Number(process.env.PORT ?? 3001)

const startServer = async () => {
    try {
        await database.sync()
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error)
        process.exit(1)
    }

    app.listen(PORT, () => {
        console.log('Listening on', PORT)
    })
}

startServer()