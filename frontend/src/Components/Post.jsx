import { useParams } from "react-router-dom";
import Comments from "./Comments";
import Edit_Post from "./Edit_Post";

function Post({ posts }) {
    const { id } = useParams();
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {return <h1 className="notFound_page">Post not found</h1>;}

    return (
        <div className="post">
            <h1>{post.title}</h1>
            <p>{post.caption}</p>
            <h3>Comments</h3>
            <Comments comments={post.comments} />
            <Edit_Post />
        </div>
    );
}

export default Post;