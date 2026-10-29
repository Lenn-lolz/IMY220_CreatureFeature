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
                const albumResponse = await fetch(`http://localhost:3000/api/albums/${id}`);
                if (!albumResponse.ok) {
                    throw new Error("Unable to load album.");
                }
                const albumData = await albumResponse.json();

                setAlbum(albumData);
                const postsResponse = await fetch(
                    "http://localhost:3000/api/posts"
                );

                if (!postsResponse.ok) {
                    throw new Error("Unable to load posts.");
                }

                const postsData = await postsResponse.json();
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

    if (loading) {return <h1>Loading album...</h1>;}
    if (error) {return <h1>{error}</h1>;}
    if (!album) {return <h1>Album not found.</h1>;}

    return(
        <div className="min-h-screen flex items-start justify-center ">
            <div className="min-w-100 flex justify-center flex-col bg-indigo-500/50 ml-45 flex flex-col p-5">
                <h1>{album.name}</h1>
                <p>{album.description}</p>
                <button className="bg-teal-200 w-20" >add post</button>
                <h2>Posts</h2>
            </div>

            {posts.length=== 0? (<p>This album has no posts</p>):(
                <div className="flex flex-row justify-center p-2 mb-2 bg-indigo-800/20 ml-48">
                    <Posts posts={posts} setPosts={setPosts} />
                </div>
            )}

        </div>
    );
}

export default AlbumPage;