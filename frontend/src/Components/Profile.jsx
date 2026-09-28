import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
    const { _id } = useParams();
    return (
        <div className="User_profile">
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;