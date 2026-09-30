import { useNavigate } from "react-router-dom";

function Post({ post ,onDelete }) {

    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem("userId");
    const isOwnPost = post.userId === loggedInUserId;

    async function deletePost() {
        try {

            const response = await fetch(
                `http://localhost:3000/api/posts/${post._id}`,
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
                alert(data.message);
                return;
            }

        onDelete(post._id);

        } catch (error) {

            console.log("Error deleting post:", error);

            alert("Unable to delete post.");
        }
    }
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
            {isOwnPost && (<button onClick={deletePost}>Delete Post</button>)}
            
            {!isOwnPost && (<button onClick={viewProfile}>View Profile</button>)}
        </div>
    );
}

export default Post;