import Post from "./Post";

function Posts({ posts, setPosts }) {
    function removePost(postId) {
        setPosts(posts.filter((post) => post._id !== postId));
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {posts.map((post) => (
                <div key={post._id} className="bg-rose-400 m-1 p-2 ">
                    <Post  post={post} onDelete={removePost} />
                </div>
            ))}
        </div>
    );
}

export default Posts;