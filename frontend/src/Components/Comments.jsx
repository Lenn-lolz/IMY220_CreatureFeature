function Comments({ comments}) {
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <strong>{comment.user}</strong>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default Comments;