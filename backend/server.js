import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDB } from "./db.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Authentication API Request

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.status(200).json({
        success: true,
        message: "Login successful",
        username: username
    });
});
app.post("/signup", (req, res) => {
    const username = req.body.username;
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        username: username
    });
});
app.get("/api/posts", async (req, res) => {
    // TODO: Retrieve all posts from MongoDB
    try {
        const db = getDB();
        const collection = db.collection("Posts");
        const posts = await collection.find().toArray();
        const formattedPosts = posts.map((post) => ({

            ...post,
            _id: post._id.toString()

        }));
        res.status(200).json(formattedPosts);
        console.log("Great success with retrieving users!");

    }catch(error){
        console.log("error with retrieving posts - " , error.message);
    }
});
//Profile API Request (View, Edit, View other profiles, Delete your profile)

app.get("/api/users", async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection("Users");
        const users = await collection.find().toArray();

        const formattedUsers = users.map((user) => ({
            ...user,
            _id: user._id.toString()

        }));

        res.status(200).json(formattedUsers);

        console.log("Great success with retrieving users!");

    } catch (error) {

        console.log("Error with retrieving users - ", error.message);

        res.status(500).json({

            error: "Failed to retrieve users"

        });

    }

});

//Friend / Unfriend API Request
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
});