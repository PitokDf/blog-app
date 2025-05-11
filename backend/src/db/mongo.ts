import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!)

export const mongo = {
    client, db: client.db(process.env.MONGODB_DB)
}