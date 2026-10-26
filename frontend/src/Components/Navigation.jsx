import { Link,useNavigate  } from "react-router-dom";
import '../assets/CSS/Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("userId");
        navigate("/splash");
    }
    return (
        <nav className="fixed top-0 left-0 z-40 h-screen w-34 border-r border-slate-200 bg-violet-200 p-5" >
            <Link to="/" className="bg-violet-400 p-2 m-2">Home</Link>
            <Link to="/profile" className="bg-violet-400 p-2 m-2">Profile</Link>
            <button className="bg-violet-400 p-2 m-2" onClick={handleLogout}>Log out</button>
            <Link to="/CreatePost" className="bg-violet-400 p-2 m-2"><button>Post</button></Link>
        </nav>
    );
}

export default Navigation;