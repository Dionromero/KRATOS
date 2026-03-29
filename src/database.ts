import { mongoCLient, Db, MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!

const client = new MongoClient(uri)
let db: Db

export async function inicializadorBanco(){
    await client.connect()
    db = client.db(" KRATOS ")
    await db.collection("usuarios").createIndex({ email: 1 } , { unique: true })

    console.log(" Banco de dados MongoDB inicializado! ")
}

export function getDb(){
    return db
}

