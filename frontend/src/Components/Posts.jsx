import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Posts({ posts, profileId }) {

    const profilePosts= posts.filter((post) =>post.profileId === profileId);
        useEffect(() => {fetch("http://localhost:3001/api/posts").then((response) => {
        if (!response.ok) {
            throw new Error("Failed to retrieve posts");
        }
            return response.json();
        }).then((data) => {setPosts(data);setLoading(false);}).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, []);
    return (
        <div>
            {profilePosts.map((post) => (
                <div key={post.id} className="posts">
                    <h3>{post.title}</h3>
                    <p>{post.caption}</p>
                    <Link to={`/posts/${post.id}`}>
                        View Post
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Posts;