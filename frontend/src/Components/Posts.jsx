import Post from "./Post";

function Posts({ posts, setPosts }) {
    function removePost(postId) {
        setPosts(posts.filter((post) => post._id !== postId));
    }
    return (
        <div>
            {posts.map((post) => (
                <Post key={post._id} post={post} onDelete={removePost}/>
            ))}
        </div>
    );
}

export default Posts;