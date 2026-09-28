import { MongoClient } from "mongodb";
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

let client;
let db;

async function connectDB() {
    const uri = process.env.MONGO_URI;

    client = new MongoClient(uri);

    try{
        await client.connect();
        db = client.db("CreatureFeatureDB");
        console.log("Connected to MongoDB");
    }catch(error){
        console.log(error.message);
    }

}

function getDB() {
    return db;
}

export { connectDB, getDB };