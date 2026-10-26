import Post from "./Post";

function Posts({ posts, setPosts }) {
    function removePost(postId) {
        setPosts(posts.filter((post) => post._id !== postId));
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {posts.map((post) => (
                <div className="bg-amber-500 m-1 p-2 ">
                    <Post key={post._id} post={post} onDelete={removePost} />
                </div>
            ))}
        </div>
    );
}

export default Posts;