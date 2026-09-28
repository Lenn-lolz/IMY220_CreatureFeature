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

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try { 
        const db = getDB();
        const user = await db.collection("Users").findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                success: false, message: "Incorrect username or password" 
            }); 
        } if (user.password !== password) {
            return res.status(401).json({
                success: false, message: "Incorrect username or password" 
            }); 
        } res.status(200).json({
            success: true, message: "Login successful",
            user: { _id: user._id.toString(),username: user.username, caption: user.caption }
        }); 
    } catch (error) {
        console.log("Error during login:", error.message);
        res.status(500).json({
            success: false, message: "Server error during login" 
        });
    } 
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
app.get("/api/posts/:id", async (req, res) => {
    // Get one post
});

app.post("/api/posts", async (req, res) => {
    // Create post
});

app.put("/api/posts/:id", async (req, res) => {
    // Edit post
});

app.delete("/api/posts/:id", async (req, res) => {
    // Delete post
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
app.get("/api/users/:id", async (req, res) => {
    // Get user from MongoDB
});

app.put("/api/users/:id", async (req, res) => {
    // Update user
});

app.delete("/api/users/:id", async (req, res) => {
    // Delete user
});

//Friend / Unfriend API Request

app.post("/api/users/:id/friends/:friendId", async (req, res) => {
    // Add friendId to user's friends array
});

app.delete("/api/users/:id/friends/:friendId", async (req, res) => {
    // Remove friendId from user's friends array
});

//Album 

app.get("/api/albums", async (req, res) => {
    // Get albums
});

app.get("/api/albums/:id", async (req, res) => {
    // Get one album
});

app.post("/api/albums", async (req, res) => {
    // Create album
});

app.put("/api/albums/:id", async (req, res) => {
    // Edit album
});

app.delete("/api/albums/:id", async (req, res) => {
    // Delete album
});

//Comments:

app.get("/api/posts/:postId/comments", async (req, res) => {
    // Get comments for post
});

app.post("/api/posts/:postId/comments", async (req, res) => {
    // Add comment
});

// LOCAL V GLOBAL

app.get("/api/feed/global", async (req, res) => {
    // Return global feed
});

app.get("/api/feed/local", async (req, res) => {
    // Return local feed
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
});