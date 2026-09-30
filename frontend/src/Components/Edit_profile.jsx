import { useState } from "react";

function Edit_profile({ profile, onProfileUpdated }) {

    const [username, setUsername] = useState(profile.username);
    const [pronouns, setPronouns] = useState(profile.pronouns || "");
    const [caption, setCaption] = useState(profile.caption || "");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();
        const loggedInUserId = localStorage.getItem("userId");

        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${profile._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        pronouns: pronouns,
                        caption: caption,
                        loggedInUserId: loggedInUserId
                    })
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
        <div className="Edit_profile_form">

            <form onSubmit={handleSubmit}>
                <h2>Edit profile</h2>
                <label>New Username
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>

                <label>New Profile pic
                    <input type="file" id="profile-pic" name="profilePic" accept="image/png, image/jpeg"/>
                </label>

                <label>New Pronouns
                    <input type="text" value={pronouns} onChange={(e) => setPronouns(e.target.value)}/>
                </label>

                <label>New Caption
                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)}/>
                </label>

                {error && <p>{error}</p>}
                {message && <p>{message}</p>}

                <button type="submit">Save Changes</button>

            </form>
        </div>
    );
}

export default Edit_profile;