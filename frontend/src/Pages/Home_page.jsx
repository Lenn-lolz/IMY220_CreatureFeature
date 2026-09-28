import { useState, useEffect } from "react";

import Posts from "../Components/Posts";

import "../assets/CSS/styles.css";

function Home_page() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("http://localhost:3000/api/posts")
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

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="homePage-layout">
            <Posts posts={posts} />
        </div>
    );
}

export default Home_page;