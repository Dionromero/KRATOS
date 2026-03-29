import { MongoClient, Db } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)
let db: Db

export async function inicializarBanco() {
    await client.connect()
    db = client.db("KRATOS")
    await db.collection("usuarios").createIndex({ email: 1 }, { unique: true })
    console.log("MongoDB conectado!")
}

export function getDb() {
    if (!db) throw new Error("Banco não inicializado")
    return db
}