import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDB } from "./db.js";
import { ObjectId } from "mongodb";
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
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const db = getDB();

        console.log("Database:", db.databaseName);
        console.log("Signup username:", username);

        const existingUser = await db.collection("Users").findOne({
            username: username
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        const newUser = {
            username: username,
            password: password,
            caption: "",
            friends: []
        };

        const result = await db.collection("Users").insertOne(newUser);

        console.log("Inserted user ID:", result.insertedId);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: result.insertedId.toString(),
                username: newUser.username,
                caption: newUser.caption,
                friends: newUser.friends
            }
        });

    } catch (error) {
        console.log("Error during signup:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to register user"
        });
    }
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
            }:null
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

//creating the post
app.post("/api/posts", async (req, res) => {
    const userId = req.body.userId;
    const caption = req.body.caption;
    const hashtags = req.body.hashtags || [];

    try {
        const db = getDB();
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }
        if (!caption || caption.trim() === "") {
            return res.status(400).json({success: false,message: "Caption is required"});
        }
        const user = await db.collection("Users").findOne({
            _id: new ObjectId(userId)
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const newPost = {
            userId: new ObjectId(userId),
            caption: caption,
            hashtags: hashtags,
            likes: 0
        };
        const result = await db.collection("Posts").insertOne(newPost);

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: {
                _id: result.insertedId.toString(),
                userId: userId,
                caption: caption,
                hashtags: hashtags,
                likes: 0
            }
        });

    } catch (error) {
        console.log("Error creating post:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to create post"
        });
    }
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
    try {
        const db = getDB();

        const user = await db.collection("Users").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: {
                _id: user._id.toString(),
                username: user.username,
                caption: user.caption,
                friends: user.friends
            }
        });

    } catch (error) {
        console.log("Error retrieving user:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve profile"
        });
    }
});

app.get("/api/users/:id/posts", async (req, res) => {
    try {
        const db = getDB();
        const userId = new ObjectId(req.params.id);

        const posts = await db.collection("Posts").aggregate([
            {
                $match: {
                    userId: userId
                }
            },
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
        console.log("Error retrieving user posts:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve user posts"
        });
    }
});

app.put("/api/users/:id", async (req, res) => {

    const userId = req.params.id;
    const loggedInUserId = req.body.loggedInUserId;

    const username = req.body.username;
    const pronouns = req.body.pronouns;
    const caption = req.body.caption;

    try {

        // Make sure the user is editing their own profile
        if (userId !== loggedInUserId) {
            return res.status(403).json({
                success: false,
                message: "You can only edit your own profile"
            });
        }

        const db = getDB();

        const existingUser = await db.collection("Users").findOne({
            _id: new ObjectId(userId)
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if the new username belongs to another user
        const usernameExists = await db.collection("Users").findOne({
            username: username,
            _id: { $ne: new ObjectId(userId) }
        });

        if (usernameExists) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        const updatedUser = await db.collection("Users").findOneAndUpdate(
            {
                _id: new ObjectId(userId)
            },
            {
                $set: {
                    username: username,
                    pronouns: pronouns,
                    caption: caption
                }
            },
            {
                returnDocument: "after"
            }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: updatedUser._id.toString(),
                username: updatedUser.username,
                caption: updatedUser.caption,
                friends: updatedUser.friends,
                role: updatedUser.role,
                pronouns: updatedUser.pronouns
            }
        });

    } catch (error) {

        console.log("Error updating user:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to update profile"
        });
    }
});

//delete user API endpoint
app.delete("/api/users/:id", async (req, res) => {

    const userId = req.params.id;
    const loggedInUserId = req.body.loggedInUserId;

    try {

        // Make sure the user is deleting their own profile
        if (userId !== loggedInUserId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own profile"
            });
        }

        const db = getDB();

        const objectUserId = new ObjectId(userId);

        // Check that the user exists
        const user = await db.collection("Users").findOne({
            _id: objectUserId
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Delete all posts belonging to this user
        const deletedPosts = await db.collection("Posts").deleteMany({
            userId: objectUserId
        });

        // Delete the user
        const deletedUser = await db.collection("Users").deleteOne({
            _id: objectUserId
        });

        res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
            deletedPosts: deletedPosts.deletedCount,
            deletedUser: deletedUser.deletedCount
        });

    } catch (error) {

        console.log("Error deleting user:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to delete profile"
        });
    }
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