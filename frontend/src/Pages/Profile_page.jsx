import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../assets/CSS/styles.css";

import Edit_profile from "../Components/Edit_profile";
import Albums from "../Components/Albums";
import Posts from "../Components/Posts";

function Profile_page() {

    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const loggedInUserId = localStorage.getItem("userId");
    const [isFriend, setIsFriend] = useState(false);
    const navigate = useNavigate();

    async function toggleFriend() {

        if (!loggedInUserId) {setError("You must be logged in."); return;}
        try {
            const method = isFriend ? "DELETE" : "POST";
            const response = await fetch(`http://localhost:3000/api/users/${loggedInUserId}/friends/${profile._id}`,
                {method: method}
            );
            const data = await response.json();

            if (!response.ok) {setError(data.message);return;}
            setIsFriend(!isFriend);

        } catch (error) {

            console.log("Error changing friend:", error);
            setError(isFriend? "Unable to unfriend user.":"Unable to add friend.");
        }
    }
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
                if (!response.ok) {
                    throw new Error("Failed to retrieve profile");
                }

                return response.json();
            })
            .then((data) => {
                setProfile(data.user);
                if (loggedInUserId && userId !== loggedInUserId) {
                    return fetch(
                        `http://localhost:3000/api/users/${loggedInUserId}`
                    )
                    .then((response) => {

                        if (!response.ok) {
                            throw new Error("Failed to retrieve logged in user");
                        }

                        return response.json();
                    })
                    .then((loggedInData) => {

                        const friends = loggedInData.user.friends || [];

                        setIsFriend(
                            friends.includes(userId)
                        );

                        return fetch(
                            `http://localhost:3000/api/users/${userId}/posts`
                        );
                    });
                }

                return fetch(
                    `http://localhost:3000/api/users/${userId}/posts`
                );
            })
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Unable to load posts.");
                }return response.json();
            }).then((data) => {

                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {

                setError(error.message);
                setLoading(false);
            });
    fetch("http://localhost:3000/api/albums")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to load albums.");
            }

            return response.json();
        })
        .then((data) => {
            const userAlbums = data.filter(
                (album) => album.userId === userId
            );

            setAlbums(userAlbums);
        })
        .catch((error) => {
            console.log("Error loading albums:", error);
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

                {!isOwnProfile && (
                    <button onClick={toggleFriend}>
                        {isFriend ? "Unfriend" : "Add Friend"}
                    </button>
                )}
            </div>


            {isOwnProfile && (
                <div>
                    <Edit_profile profile={profile} onProfileUpdated={setProfile}/>
                    <button onClick={deleteProfile}> Delete Profile</button>
                    <button onClick={() => navigate("/createAlbum")}> Create Album </button>
                </div>
            )}
            <div className="Profile_posts">
                <Posts posts={posts}setPosts={setPosts} profileId={profile._id}/>
            </div>
            <div className="Profile_albums">
                <h2>Albums</h2>
                <Albums albums={albums} />
            </div>
        </div>
    );
}

export default Profile_page;