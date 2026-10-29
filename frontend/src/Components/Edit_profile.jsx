import { useState } from "react";

function Edit_profile({ profile, onProfileUpdated }) {

    const [username, setUsername] = useState(profile.username);
    const [pronouns, setPronouns] = useState(profile.pronouns || "");
    const [caption, setCaption] = useState(profile.caption || "");
    const [ProfileImage, setProfileImage] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();
        const loggedInUserId = localStorage.getItem("userId");

        try {

            const EditStuff = new FormData();
            EditStuff.append("username",username);
            EditStuff.append("pronouns",pronouns);
            EditStuff.append("caption",caption);
            EditStuff.append("loggedInUserId",loggedInUserId);

            if(ProfileImage){
                EditStuff.append("image",ProfileImage)
            }
            const response = await fetch(
                `http://localhost:3000/api/users/${profile._id}`,
                {
                    method: "PUT",
                    body: EditStuff,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setMessage("Profile updated successfully!");
            setError("");

            onProfileUpdated(data.user);

        } catch (error) {

            console.log("Error updating profile:", error);
            setError("Unable to update profile.");
        }
    }

    return (
        <div className="flex flex-col  justify-center">

            <form onSubmit={handleSubmit} className="flex flex-col bg-rose-600/50 p-4 m-2">
                <h2 className="flex justify-center font-Heading text-2xl">Edit profile</h2>
                <label className="flex justify-center flex-col ">New Username
                    <input className="p-1 text-rose-900 rounded border-2 border-rose-900 bg-rose-200" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>

                <label className="flex justify-center flex-col  "  >
                        New Profile pic
                    <input
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0] || null)}
                    className="p-1 text-rose-900 rounded border-2 border-rose-900 bg-rose-200" type="file" id="profile-pic" name="profilePic"/>
                </label>

                <label className="flex justify-center flex-col  ">New Pronouns
                    <input  className="p-1 text-rose-900 rounded border-2 border-rose-900 bg-rose-200" type="text" value={pronouns} onChange={(e) => setPronouns(e.target.value)}/>
                </label>

                <label className="flex justify-center flex-col ">New Caption
                    <input className="p-1 text-rose-900 rounded border-2 border-rose-900 bg-rose-200" type="text" value={caption} onChange={(e) => setCaption(e.target.value)}/>
                </label>

                {error && <p>{error}</p>}
                {message && <p>{message}</p>}

                <button className="max-w-50 text-teal-900 flex justify-center m-2 p-1 rounded bg-teal-500 hover:bg-teal-600 " type="submit">Save Changes</button>

            </form>
        </div>
    );
}

export default Edit_profile;