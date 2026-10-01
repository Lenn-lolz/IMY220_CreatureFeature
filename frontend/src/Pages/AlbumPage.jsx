import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Posts from "../Components/Posts";

function AlbumPage() {
    const { id } = useParams();

    const [album, setAlbum] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getAlbum() {
            try {
                // Get the album
                const albumResponse = await fetch(
                    `http://localhost:3000/api/albums/${id}`
                );
                if (!albumResponse.ok) {
                    throw new Error("Unable to load album.");
                }

                const albumData = await albumResponse.json();

                setAlbum(albumData);

                // Get all posts
                const postsResponse = await fetch(
                    "http://localhost:3000/api/posts"
                );

                if (!postsResponse.ok) {
                    throw new Error("Unable to load posts.");
                }

                const postsData = await postsResponse.json();

                // Only keep posts that are in this album
                const albumPosts = postsData.filter((post) =>
                    albumData.postIds.includes(post._id)
                );

                setPosts(albumPosts);
                setLoading(false);

            } catch (error) {
                console.log("Error loading album:", error);
                setError(error.message);
                setLoading(false);
            }
        }

        getAlbum();
    }, [id]);

    if (loading) {
        return <h1>Loading album...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!album) {
        return <h1>Album not found.</h1>;
    }

    return (
        <div className="AlbumPage">

            <h1>{album.name}</h1>
            <p>{album.description}</p>
            <h2>Posts</h2>

            {posts.length === 0? (
                <p>This album has no posts yet.</p>
            ):(
                <div>
                    <Posts posts={posts} setPosts={setPosts} />
                </div>
            )}

        </div>
    );
}

export default AlbumPage;