import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Create_album() {
    const { _id } = useParams();
    return (
        <div className="CreateAlbum_form">
            <form>
                
            </form>
        </div>
    );
}

export default Create_album;