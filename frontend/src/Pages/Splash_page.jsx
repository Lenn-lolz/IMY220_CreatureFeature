import Login from "../Components/Login";
import "../assets/CSS/styles.css"; 
import { Link } from "react-router-dom";

function Splashpage() {
    return (
        <div className="Splashpage-layout">
            <h1>Creature Feature</h1>
            <p>Featuring all your creature pictures!</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>SignUp</button>
            </Link>

        </div>
    );
}

export default Splashpage;