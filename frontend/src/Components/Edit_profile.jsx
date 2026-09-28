import { useState } from 'react';

function Edit_profile() {
    return (
        <div className="Edit_profile_form">
           <h2>Edit profile</h2>
           <form>
                <label> New Username
                    <input type='text'></input>
                </label>
                <label> New Profile pic
                    <input type="file" id="profile-pic" name="profilePic" accept="image/png, image/jpeg"></input>
                </label>
           </form>
        </div>
    );
}

export default Edit_profile;