
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Edit_profile from "../Components/Edit_profile";
import Posts from "../Components/Posts";

function Profile_page() {
    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to retrieve users");
                }

                return response.json();
            })
            .then((data) => {
                const foundProfile = data.find(
                    (prof) => prof._id === id
                );

                setProfile(foundProfile);

                return fetch("http://localhost:3000/api/posts");
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to load posts.");
                }

                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <h1>Loading profile...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!profile) {
        return (
            <h1 className="notFound_page">
                Profile not found
            </h1>
        );
    }

    return (
        <div className="profilePage-layout">
            <h1>{profile.username}</h1>

            <p>{profile.caption}</p>

            <h2>Profile ID: {profile._id}</h2>

            <Edit_profile />

            <div className="Profile_posts">
                <Posts
                    posts={posts}
                    profileId={profile._id}
                />
            </div>
        </div>
    );
}

export default Profile_page;
