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
        <div className="Album_comp">
            <h3>{album.name}</h3>
            <p>{album.description}</p>
            <button onClick={() => navigate(`/albums/${album._id}`)}>View Album</button>
            {isOwner && (<button onClick={deleteAlbum}>Delete Album</button>)}
        </div>
    );
}

export default Album;