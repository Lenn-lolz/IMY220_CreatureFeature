import { useState } from 'react';

function Edit_Post() {
    return (
        <div className="Edit_Post_Form">
           <h2>Edit post</h2>
           <form>
                <label> New Post caption
                    <input type='text'></input>
                </label>
                <label> New Post title
                    <input type="file" id="profile-pic" name="profilePic" accept="image/png, image/jpeg"></input>
                </label>
           </form>
        </div>
    );
}

export default Edit_Post;