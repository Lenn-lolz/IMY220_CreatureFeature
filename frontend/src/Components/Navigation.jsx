import { Link,useNavigate  } from "react-router-dom";
import '../assets/CSS/Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("userId");
        navigate("/splash");
    }
    return (
        <nav className="fixed top-0 left-0 z-40 h-screen w-44 border-r border-slate-200 bg-indigo-950 p-5 flex flex-col" >
            <Link to="/" className=" text-center bg-violet-400 p-2 m-2">Home</Link>
            <Link to="/profile" className="text-center bg-violet-400 p-2 m-2">Profile</Link>
            <button className="bg-violet-400 p-2 m-2" onClick={handleLogout}>Log out</button>
            <Link to="/CreatePost" className="fixed bottom-0 text-center bg-teal-200 p-5 m-2"><button>Post</button></Link>
        </nav>
    );
}

export default Navigation;