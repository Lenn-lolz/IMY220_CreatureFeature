import { useNavigate } from "react-router-dom";

function Post({ post }) {

    console.log("POST:", post);

    const navigate = useNavigate();

    function viewProfile() {
        if (post.user) {
            navigate(`/profile/${post.user._id}`);
        }
    }

    return (
        <div className="post">
            <h3>{post.user ? post.user.username :"Unknown user"}</h3>
            <p>{post.caption}</p>
            <p> #{post.hashtags.join(" #")}</p>
            <p> Likes: {post.likes}</p>
            
            <button onClick={viewProfile}>View Profile</button>
        </div>
    );
}

export default Post;