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
        <div className="min-h-screen flex flex-col items-center justify-center">
            <form className="border-2 border-dotted border-indigo-100 bg-violet-500 flex flex-col items-center gap-4 p-2" onSubmit={createAlbum}>
                <h2 className="font-bold text-2xl">Create Album</h2>

                <label>Album Name:
                    <input className="bg-indigo-100 p-1 m-2 rounded" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </label>
                <label>Album Description:
                    <input className="bg-indigo-100 p-1 m-2 rounded" type="text" value={description} onChange={(event) => setDescription(event.target.value)}/>
                </label>
                <button className="font-bold bg-indigo-900 p-2 rounded-2xl hover:bg-indigo-400" type="submit">Create Album </button>
            </form>
            {error && <p className="bg-red-400 p-1 m-1 text-red-950 m-1 rounded">{error}</p>}
        </div>
    );
}

export default Create_album;