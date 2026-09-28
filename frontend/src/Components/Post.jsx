import { useNavigate } from "react-router-dom";

function Post({ post }) {
console.log("POST:", post);
    const navigate = useNavigate();

    function viewProfile() {
        navigate(`/profile/${post.user._id}`);
    }

    return (
        <div className="post">

            <h3>{post.user.username}</h3>

            <p>{post.caption}</p>

            <p>
                #{post.hashtags.join(" #")}
            </p>

            <p>
                Likes: {post.likes.length}
            </p>

            <button onClick={viewProfile}>
                View Profile
            </button>

        </div>
    );
}

export default Post;