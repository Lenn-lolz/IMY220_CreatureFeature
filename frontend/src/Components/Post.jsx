import { useNavigate } from "react-router-dom";

function Post({ post ,onDelete }) {

    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem("userId");
    const isOwnPost = post.userId === loggedInUserId;

    async function deletePost() {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${post._id}`,{
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
        }
    }
    function viewProfile() {
        if (post.user) {
            navigate(`/profile/${post.user._id}`);
        }
    }

    return (
        <div className="bg-sky-950 text-violet-100/80 p-1 flex flex-col justify-center items-center border-2 border-dotted">
            {!isOwnPost && ( 
                <h3 className="text-3xl font-Heading ">{post.user ? post.user.username :"Unknown user"}</h3>
            )}

            <h3 className="text-2xl font-bold font-TextRegular">{post.caption}</h3>
            <p> #{post.hashtags.join(" #")}</p>
            <p> Likes: {post.likes}</p>
            {isOwnPost && (
                <div className="flex">
                    <button className=" font-TextRegular bg-rose-400 p-1 m-1 text-rose-950 hover:bg-rose-800 " onClick={deletePost}>Delete Post</button>
                    <button className=" font-TextRegular bg-rose-400 p-1 m-1 text-rose-950 hover:bg-rose-800" onClick={() => navigate(`/editPost/${post._id}`)}>Edit Post</button>
                </div>
            )
            }
            
            {!isOwnPost && (<button className="font-TextRegular bg-indigo-900 p-1.5 m-1 flex rounded-xl hover:bg-indigo-950" onClick={viewProfile}>View Profile</button>)}
        </div>
    );
}

export default Post;