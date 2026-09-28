import { useState } from 'react';

function Create_Post() {
    return (
        <div className="Edit_profile_form">
           <h2>Create Post</h2>
           <form>
                <label> Caption
                    <input type='text'></input>
                </label>
                <label> Upload Post
                    <input type="file" id="profile-pic" name="profilePic" accept="image/png, image/jpeg"></input>
                </label>
           </form>
        </div>
    );
}

export default Create_Post;