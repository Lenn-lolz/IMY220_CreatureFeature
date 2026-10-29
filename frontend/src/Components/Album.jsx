import { useNavigate } from "react-router-dom";

function Album({ album }) {
    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem("userId");
    const isOwner = album.userId === loggedInUserId;
    
    async function deleteAlbum() {

        try {
            const response = await fetch(`http://localhost:3000/api/albums/${album._id}`,
                {method: "DELETE"}
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Unable to delete album.");
            }
        } catch (error) {
            console.log("Error deleting album:", error);
        }
    }return (
        <div className="bg-rose-900 border-indigo-200 border-2 border-dotted p-2">
            <h3 className="font-Heading text-2xl">{album.name}</h3>
            <p>{album.description}</p>
            <button className="flex bg-teal-500 rounded p-1 text-teal-950 font-bold m-1" onClick={() => navigate(`/albums/${album._id}`)}>View Album</button>
            {isOwner && (<button onClick={deleteAlbum}>Delete Album</button>)}
        </div>
    );
}

export default Album;