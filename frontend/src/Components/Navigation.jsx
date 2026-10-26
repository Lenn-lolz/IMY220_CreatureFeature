import { Link,useNavigate  } from "react-router-dom";
import '../assets/CSS/Navigation.css';
import logo from "../assets/Images/CF.png"; 

function Navigation() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("userId");
        navigate("/splash");
    }
    return (
        <nav className="fixed top-0 left-0 z-40 h-screen w-44 border-r-5 border-amber-500 border-dotted bg-indigo-950 p-5 flex flex-col" >

            <img src={logo} alt="CF Logo"  className="w-25"/>

            <Link to="/" className="rounded hover:bg-teal-700 text-center bg-violet-400 p-2 m-2">Home</Link>
            <Link to="/profile" className="rounded hover:bg-teal-700 text-center bg-violet-400 p-2 m-2">Profile</Link>
            <button className="rounded hover:bg-teal-700 bg-violet-400 p-2 m-2" onClick={handleLogout}>Log out</button>
            <Link to="/CreatePost" className="rounded hover:bg-teal-700 fixed bottom-0 text-center bg-teal-200 rounded-4xl p-5 m-3 mb-5 ml-5 hover:bg-teal-400 shadow-[0px_2px_2px_5px_rgba(22,81,94,0.8)]"><button>Post</button></Link>
        

        </nav>
        
    );
}

export default Navigation;