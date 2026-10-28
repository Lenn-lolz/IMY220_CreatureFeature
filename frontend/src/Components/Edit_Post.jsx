import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit_Post() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${id}`
                );
                if (!response.ok) {
                    throw new Error("Unable to load post.");
                }
                const data = await response.json();

                setCaption(data.caption);
                setLoading(false);

            } catch (error) {

                console.log("Error loading post:", error);
                setError(error.message);
                setLoading(false);
            }
        }
        getPost();
    }, [id]);
    async function editPost(event) {

        event.preventDefault();
        try {

            const response = await fetch(`http://localhost:3000/api/posts/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        caption: caption
                    })
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unable to edit post.");
            }
            console.log("Post updated:", data);
        } catch (error) {
            console.log("Error editing post:", error);
            setError(error.message);
        }
    }
    if (loading) {
        return <h2>Loading post...</h2>;
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={editPost} className="min-h-50 border-3 border-dotted border-violet-950 bg-indigo-400 flex flex-col items-center gap-4 p-2 justify-center">
                <h2 className="font-Heading text-4xl">Edit post</h2>
                <label> New Post caption
                    <input className="bg-indigo-200 p-1" type="text" value={caption} onChange={(event) => setCaption(event.target.value)}/>
                </label>

                <button type="submit" className="bg-indigo-200 p-2 rounded hover:bg-indigo-300">Save Changes</button>

            </form>
            {error && <p>{error}</p>}

        </div>
    );
}

export default Edit_Post;