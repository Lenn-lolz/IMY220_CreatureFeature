import { useState, useEffect } from "react";

import Posts from "../Components/Posts";
import Albums from "../Components/Albums";

import "../assets/CSS/styles.css";

function Home_page() {
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isLocal, setIsLocal] = useState(true);
    const [thingSearched, setThingSearched] = useState("");

    // Get the logged-in user's ID
    const loggedInUserId = localStorage.getItem("userId");

    useEffect(() => {
        async function fetchFeed() {
            setLoading(true);
            setError("");

            try{
                //feed want
                const feedType= isLocal ? "local" :"general";

                const postsResponse = await fetch(
                    `http://localhost:3000/api/posts?feed=${feedType}&userId=${loggedInUserId}`
                );
                const albumsResponse = await fetch(
                    `http://localhost:3000/api/albums?feed=${feedType}&userId=${loggedInUserId}`
                );

                if (!postsResponse.ok || !albumsResponse.ok) {
                    throw new Error("Unable to load feed.");
                }
                const postsData = await postsResponse.json();
                const albumsData = await albumsResponse.json();

                setPosts(postsData);
                setAlbums(albumsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchFeed();
    },[isLocal, loggedInUserId]);

    // Just switch the selected feed
    function toggleFeedType() {
        setIsLocal((previous) => !previous);
    }

    function Searching(item, thingSearched) {
        const search = thingSearched.trim().toLowerCase();
        if (!search){return true;}

        const hashtags = Array.isArray(item.hashtags)? item.hashtags.join(" "): item.hashtags || "";
        const searchableText = [
            item.name,
            item.title,
            item.caption,
            item.description,
            item.content,
            hashtags,
            item.user?.username,
            item.username
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
        return searchableText.includes(search);
    }

    const filteredPosts = posts.filter((post) =>
        Searching(post, thingSearched)
    );

    const filteredAlbums = albums.filter((album) =>
        Searching(album, thingSearched)
    );

    if (loading){return <p>...</p>;}
    if (error) {return <p>{error}</p>;}

    return (
        <div className="min-h-screen">
            <div className="flex flex-row justify-center p-2 mb-2 bg-indigo-800/20">
                <label className="text-indigo-200">
                    Search:{" "}
                    <input
                        className="bg-indigo-300 border text-indigo-900 min-w-100"
                        type="search"
                        id="searchPosts"
                        value={thingSearched}
                        onChange={(event) => setThingSearched(event.target.value)}
                    />
                </label>

                <button className="bg-indigo-300 p-1 ml-40 flex justify-end font-bold rounded hover:bg-indigo-400" onClick={toggleFeedType}>
                   {isLocal ? "General": "Local"}
                </button>
            </div>

            <div className="ml-48 text-slate-900">
                <h2>{isLocal ? "Local Feed" : "General Feed"}</h2>

                <Posts posts={filteredPosts} />
                <Albums albums={filteredAlbums} />
            </div>
        </div>
    );
}

export default Home_page;