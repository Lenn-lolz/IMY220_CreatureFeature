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

    const [isEdit, setIsEdit] = useState(false);

    async function toggleEdit() {
        setIsEdit(!isEdit);
    }
    const navigate = useNavigate();

    async function toggleFriend() {
        if (!loggedInUserId) {setError("You must be logged in."); return;}
        try {
            const method = isFriend? "DELETE": "POST";
            const response= await fetch(`http://localhost:3000/api/users/${loggedInUserId}/friends/${profile._id}`,
                {method: method}
            );
            const data = await response.json();
            if (!response.ok) {setError(data.message);return;}
            setIsFriend(!isFriend);

        } catch (error) {
            console.log("Error changing friend:", error);
            setError(isFriend? "Unable to unfriend user *sad.":"Unable to add friend *sad.");
        }
    }
    async function deleteProfile() {
        const loggedInUserId = localStorage.getItem("userId");
        if (!loggedInUserId) {
            setError("You must be logged in okk.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/users/${loggedInUserId}`,{
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
    useEffect(()=> {
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
                    return fetch(`http://localhost:3000/api/users/${loggedInUserId}`)
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
                        return fetch(`http://localhost:3000/api/users/${userId}/posts`);
                    });
                }
                return fetch(`http://localhost:3000/api/users/${userId}/posts`);
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

},[id, loggedInUserId]);

    if (loading) {return <h1>Loading profile...</h1>;}
    if (error) {return <h1>{error}</h1>;}
    if (!profile) {
        return (
            <h1 className="notFound_page">Profile not found</h1>
        );
    }

    const isOwnProfile= profile._id === loggedInUserId;

    return (
        <div className=" flex flex-col items-center min-h-screen w-full bg-violet-900/50 text-slate-100 p-4 ">
            <div className="w-full max-w-4xl flex flex-col gap-6">
                <div className="flex bg-rose-800 p-3 m-1 rounded-tl-4xl rounded-tr-4xl">
                    <div className="flex flex-row">
                        
                        <img className="w-20 h-20 rounded-full object-cover border-1 border-indigo-950 m-2 " src={profile.image} ></img>
                        <div className="flex flex-col">
                            <h1 className="font-Heading  text-3xl">{profile.username}</h1>
                            <p className="text-2xl">{profile.caption}</p>
                            {isOwnProfile &&(
                                <button className="bg-indigo-300/50 m-2 rounded font-bold" onClick={toggleEdit}>{isEdit ? "hide" :"edit"}</button>
                            )}
                            
                        </div>
                        <p className="font-Heading text-2xl">{profile.pronouns}</p>
                    </div>
                    {!isOwnProfile && (
                        <button className="hover:bg-violet-400 bg-violet-300 text-violet-950 font-bold p-1 rounded-2xl ml-95" 
                            onClick={toggleFriend}>
                            {isFriend ? "Unfriend" :"Add Friend"}
                        </button>
                    )}
                </div>


                {isOwnProfile && (
                    <div className="flex gap-3 p-4 bg-violet-800/50 rounded-xl items-center">
                        {isEdit && (
                            <Edit_profile profile={profile} onProfileUpdated={setProfile}/>
                        )}
                        <div className="">
                            <button className="bg-rose-500/50 m-2 rounded font-bold p-1 hover:bg-rose-800/50" onClick={deleteProfile}> Delete Profile</button>
                            <button className="bg-rose-500/50 m-2 rounded font-bold p-1 hover:bg-rose-800/50" onClick={() => navigate("/createAlbum")}> Create Album </button>
                        </div>
                    </div>
                )}
                {(isFriend || isOwnProfile) && (
                    <div>
                        <div className="Profile_posts w-full mt-4">
                            <div className="Profile_posts w-full mt-4">
                                <Posts posts={posts} setPosts={setPosts} profileId={profile._id}/>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="font-Heading p-5 text-3xl flex justify-center">Albums</h2>
                            <Albums albums={albums} />
                        </div>
                        <div>

                        </div>
 
                    </div>
                )}

            </div>
        </div>
    );
}

export default Profile_page;