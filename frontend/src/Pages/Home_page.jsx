import { useState, useEffect } from "react";

import Posts from "../Components/Posts";

import "../assets/CSS/styles.css";

function Home_page() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {fetch("http://localhost:3000/api/posts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to load posts.");
                }
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading){return <p>Loading posts...</p>;}
    if (error){return <p>{error}</p>;}

    return (
        <div className="min-h-screen">
            <div className="flex flex-row justify-center p-2 mb-2 bg-indigo-800/20 ">
                <label className="text-indigo-200 ">search: 
                    <input className="bg-indigo-300 border text-indigo-900 border-default-medium min-w-100" 
                    type="search" id="searchPosts"></input>
                </label>
            </div>
            <div className="ml-48 text-slate-900">
                <Posts posts={posts} />
            </div>
        </div>

    );
}

export default Home_page;