import { Sequelize } from "sequelize-typescript";
import { Task } from "../models/Task.js";
import dotenv from 'dotenv'
import { Assignment } from "../models/Assignment.js";
import { Attachment } from "../models/Attachment.js";

dotenv.config()

const sequelize = new Sequelize({
    database: process.env.DB_NAME!,
    dialect: "mysql",
    username: process.env.DB_USER!,
    password: process.env.DB_PSSWD!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT ?? 3306),
    models: [Task, Assignment, Attachment]
})

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully!")
    } catch (error) {
        console.error("Unable to connect to the database: ", error)
    }
}

testConnection()

export default sequelize