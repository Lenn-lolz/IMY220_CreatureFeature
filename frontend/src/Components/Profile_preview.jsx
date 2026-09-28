
import { Link } from "react-router-dom";

import "../assets/styles.css";

function Profile_preview({ prof }) {

    return (
        <div className="SmallProfilePreview">

            <h1>{prof.username}</h1>
            <p>{prof.caption}</p>
            <h2>Profile ID: {prof._id}</h2>

            <Link to={`/profiles/${prof._id}`}>
                <button type="button">
                    View Profile
                </button>
            </Link>

        </div>
    );
}

export default Profile_preview;

