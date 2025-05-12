import { Collection, MongoClient } from "mongodb";
import { ArticleContent } from "../models/article_content";

const client = new MongoClient(process.env.MONGODB_URI!)
let articleCollection: Collection<ArticleContent>;

export const mongo = {
    client,
    get articles() {
        return articleCollection
    },
    async connect() {
        await client.connect();
        const db = client.db(process.env.MONGODB_DB)

        articleCollection = db.collection<ArticleContent>("articles");
        await articleCollection.createIndex({ postID: 1 })

        console.log("Mongodb connected");

    }
}