import Login from "../Components/Login";
import "../assets/CSS/styles.css"; 
import logo from "../assets/Images/CF.png"; 
import { Link } from "react-router-dom";

function Splashpage() {
    return (
        <div className="Splashpage-layout">

            <div className="Slash_Header">
                <img src={logo} alt="CF Logo" />
                <h1>Creature Feature</h1>
                
            </div>

            <p>Welcome to creature feature!
             Are you the adventurous type? 
             Have you seen some creatures and want to share
              them with your friends? Bugs, Birds, weird dogs? 
              Heck yeah! See who among your friends has seen the 
              freakiest creature.
            </p>

            <div className="Splash_login">
                <Link to="/login">
                    <button>Login</button>
                </Link>

                <Link to="/signup">
                    <button>SignUp</button>
                </Link>
            </div>


        </div>
    );
}

export default Splashpage;