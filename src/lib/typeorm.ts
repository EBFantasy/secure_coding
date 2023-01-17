import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5001,
    username: "tutorial",
    password: "efrei",
    database: "iam",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})



