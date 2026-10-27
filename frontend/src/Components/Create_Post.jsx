import { useState } from "react";

function Create_Post() {

    const [caption, setCaption] = useState("");
    const [HashTags, setHashtags] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        setError(null);
        setFile(e.target.files[0]?? null);
    }

     const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setError("You must be logged in to create a post.");
            return;
        }
        if (caption.trim() ==="") {
            setError("Caption cannot be empty.");
            return;
        }
        setError("");
        setMessage("");

        try {
            // 1. Pack data into FormData instead of JSON
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("caption", caption);
            // Append the actual file payload (corresponds to the backend field name)
            if (file) {
                formData.append("image", file); 
            }
            // Array fields must be appended individually or stringified
            HashTags.forEach(tag => formData.append("hashtags[]", tag));

            // 2. Fetch call WITHOUT Content-Type header
            const response = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                body: formData // No headers object needed here
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
                setFile(null); // Clear selected file
            }
        } catch (error) {
            console.log("Could not create post:", error);
            setError("Unable to create post.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <form className="border-2 border-dotted border-indigo-100 bg-violet-500 flex flex-col items-center gap-4 p-2" onSubmit={handleSubmit}>
                <h2 className="font-bold text-2xl">Create Post</h2>
                <label>Caption
                    <input className="bg-indigo-100 p-1 m-2 rounded" type="text" value={caption} onChange={(e) => setCaption(e.target.value)}/>
                </label>

                <label>Hashtags
                    <input className="bg-indigo-100 p-1 m-2 rounded" type="text" placeholder="creature, nature" onChange={(e) => {
                            const hashtags = e.target.value.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
                            setHashtags(hashtags);
                        }}
                    />
                </label>

                <label>Upload Post
                    <input type="file" id="profile-pic" name="profilePic" onChange={handleFileChange} accept="image/png, image/jpeg"/>
                </label>

                {error && <p className="bg-red-400 p-1 m-1 text-red-950 m-1 rounded">{error}</p>}
                {message && <p>{message}</p>}

                <button className="font-bold bg-indigo-900 p-2 rounded-2xl hover:bg-indigo-400" type="submit">Create Post</button>
            </form>

        </div>
    );
}

export default Create_Post;
