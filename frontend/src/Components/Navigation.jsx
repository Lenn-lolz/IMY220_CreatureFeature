import { Link } from "react-router-dom";
import '../assets/CSS/Navigation.css';

function Navigation() {
    return (
        <nav className="Nav-Bar">
            <Link to="/" className="Nav-unit">Home</Link>
            <Link to="/profile" className="Nav-unit">Profile</Link>
            <Link to="/splash" className="Nav-unit">splash</Link>
            
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>

            <Link to="/CreatePost" className="AddPost_btn"><button>Post</button></Link>
        </nav>
    );
}

export default Navigation;