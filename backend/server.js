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
    try {
        const db = getDB();
        const posts = await db.collection("Posts").aggregate([
            {
                $lookup: {
                    from: "Users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).toArray();

        const formattedPosts = posts.map((post) => ({
            ...post,
            _id: post._id.toString(),
            userId: post.userId.toString(),

            user: post.user ? {
                _id: post.user._id.toString(),
                username: post.user.username
            } : null
        }));
        res.status(200).json(formattedPosts);

    } catch (error) {
        console.log("Error with retrieving posts - ", error.message);

        res.status(500).json({
            error: "Unable to load posts."
        });
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