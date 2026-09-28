import { useParams } from "react-router-dom";

function Post_preview() {
    const { id } = useParams();
    return (
        <div className="post">
            <h1>Post details</h1>
            <h2>Post ID:{post.id}</h2>
        </div>
    );
}

export default Post_preview;