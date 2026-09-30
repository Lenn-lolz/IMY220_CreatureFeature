import { useState } from "react";

function Create_Post() {

    const [caption, setCaption] = useState("");
    const [HashTags, setHashtags] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        const userId = localStorage.getItem("userId");

        if (!userId) {
            setError("You must be logged in to create a post.");
            return;
        }
        if (caption.trim() === "") {
            setError("Caption cannot be empty.");
            return;
        }

        setError("");
        setMessage("");

        try {

            const response = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    caption: caption,
                    hashtags: HashTags
                })
            });

            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                setError(data.message);
                return;
            }

            if (data.success) {
                setMessage("Post created successfully!");

                setCaption("");
                setHashtags([]);
            }

        } catch (error) {

            console.log("Could not create post:", error);
            setError("Unable to create post.");

        }
    };

    return (
        <div className="Create_Post">

            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <label>Caption
                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)}/>
                </label>

                <label>Hashtags
                    <input type="text" placeholder="creature, nature" onChange={(e) => {
                            const hashtags = e.target.value.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
                            setHashtags(hashtags);
                        }}
                    />
                </label>

                <label>Upload Post
                    <input type="file" id="profile-pic" name="profilePic" accept="image/png, image/jpeg"/>
                </label>

                {error && <p>{error}</p>}

                {message && <p>{message}</p>}

                <button type="submit">Create Post</button>
            </form>

        </div>
    );
}

export default Create_Post;
