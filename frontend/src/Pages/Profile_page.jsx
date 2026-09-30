import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import "../assets/CSS/styles.css";

import Edit_profile from "../Components/Edit_profile";

import Posts from "../Components/Posts";

function Profile_page() {

    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const loggedInUserId = localStorage.getItem("userId");

    async function deleteProfile() {
        const loggedInUserId = localStorage.getItem("userId");
        if (!loggedInUserId) {
            setError("You must be logged in.");
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${loggedInUserId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        loggedInUserId: loggedInUserId
                    })
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                return;
            }
            localStorage.removeItem("userId");
            window.location.href = "/splash";

        } catch (error) {

            console.log("Error deleting profile:", error);

            setError("Unable to delete profile.");
        }
    }
    useEffect(() => {

        const userId = id || loggedInUserId;

        if (!userId) {
            setError("You are not logged in.");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:3000/api/users/${userId}`)
            .then((response) => {
                if (!response.ok) {throw new Error("Failed to retrieve profile");}
                return response.json();
            }).then((data) => {
                setProfile(data.user);

                return fetch(
                    `http://localhost:3000/api/users/${userId}/posts`
                );
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

    }, [id, loggedInUserId]);

    if (loading) {return <h1>Loading profile...</h1>;}
    if (error) {return <h1>{error}</h1>;}
    if (!profile) {
        return (
            <h1 className="notFound_page">Profile not found</h1>
        );
    }

    const isOwnProfile = profile._id === loggedInUserId;

    return (
        <div className="profilePage-layout">

            <div className="Profile_header">
                <h1>{profile.username}</h1>
                <p>{profile.caption}</p>
                <p>{profile.pronouns}</p>
            </div>


            {isOwnProfile && (
                <div>
                    <Edit_profile profile={profile} onProfileUpdated={setProfile}/>
                    <button onClick={deleteProfile}>
                        Delete Profile
                    </button>
                </div>
            )}
            <div className="Profile_posts">
                <Posts posts={posts} profileId={profile._id}/>
            </div>
        </div>
    );
}

export default Profile_page;