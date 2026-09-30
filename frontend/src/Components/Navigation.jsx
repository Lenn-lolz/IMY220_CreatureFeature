import { Link,useNavigate  } from "react-router-dom";
import '../assets/CSS/Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("userId");
        navigate("/splash");
    }
    return (
        <nav className="Nav-Bar">
            <Link to="/" className="Nav-unit">Home</Link>
            <Link to="/profile" className="Nav-unit">Profile</Link>
            
            <button onClick={handleLogout}>Log out</button>

            <Link to="/CreatePost" className="AddPost_btn"><button>Post</button></Link>
        </nav>
    );
}

export default Navigation;