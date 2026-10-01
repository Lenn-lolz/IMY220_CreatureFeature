import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create_album() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function createAlbum(event) {
        event.preventDefault();

        if (!name.trim()) {
            setError("Please enter an album name.");
            return;
        }

        try {
            const userId = localStorage.getItem("userId");

            console.log("userId:", userId);
            console.log("album name:", name);

            if (!userId) {
                setError("You must be logged in.");
                return;
            }

            const response = await fetch(
                "http://localhost:3000/api/albums",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: userId,
                        name: name,
                        description: "",
                        postIds: []
                    })
                }
            );

            const data = await response.json();
            console.log("Response:", data);

            if (!response.ok) {
                throw new Error(data.error || "Unable to create album.");
            }
            console.log("Album created:", data);
        } catch (error) {
            console.error("Error creating album:", error);
            setError(error.message);
        }
    }
    return (
        <div className="CreateAlbum_form">
            <form onSubmit={createAlbum}>
                <h2>Create Album</h2>

                <label>Album Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </label>
                <label>Album Description:
                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)}/>
                </label>
                <button type="submit">Create Album </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Create_album;