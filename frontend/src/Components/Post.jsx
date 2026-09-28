function Post({ post }) {

    return (
        <div className="post">

            <p>{post.caption}</p>

            <p>
                #{post.hashtags.join(" #")}
            </p>

            <p>
                Likes: {post.likes.length}
            </p>

        </div>
    );
}

export default Post;