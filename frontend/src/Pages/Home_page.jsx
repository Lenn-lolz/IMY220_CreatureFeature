import { useState, useEffect } from "react";
import Profile_preview from "../Components/Profile_preview";
import "../assets/styles.css"; 

function Home_page(){
    const [profs, setProfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {fetch("http://localhost:3000/api/users").then((response) => {
        if (!response.ok) {
                throw new Error("Failed to retrieve users");
        } return response.json();
        }).then((data) => {
                setProfs(data); setLoading(false); 
            }) .catch((error) => { 
                setError(error.message);
                setLoading(false);
            });
        }, []);
    if (loading) {
        return <p>Loading profiles...</p>;
    } if (error) {
        return <p>{error}</p>;
    } return (
        <div className="homePage-layout">
            {profs.map((prof) => ( 
                <div className="posts" key={prof._id}>
                    <Profile_preview prof={prof} />
                </div> 
            ))}
        </div> 
    ); 
} 
export default Home_page;