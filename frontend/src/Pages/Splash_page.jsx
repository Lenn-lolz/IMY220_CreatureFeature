import Login from "../Components/Login";
import "../assets/CSS/styles.css"; 
import logo from "../assets/Images/CF.png"; 
import { Link } from "react-router-dom";


function Splashpage() {
    return (
        <div className="min-h-screen text-slate-900">
            <div className="fixed right-1 flex justify-end gap-4 p-4">
                <Link to="/login">
                    <button className="bg-green-200 px-4 py-2 rounded-lg">Login</button>
                </Link>

                <Link to="/signup">
                    <button className="bg-green-200 px-4 py-2 rounded-lg">SignUp</button>
                </Link>
            </div>       
            <div className=" flex flex-col items-center justify-center text-center min-h-[80vh] px-4">
                <div className="Slash_Header">
                    <img src={logo} alt="CF Logo "  className="w-35 flex justify-center"/>
                    <h1 className="text-5xl text-rose-100 font-Heading">Creature Feature</h1>
                </div>

                <p className="bg-red-900 max-w-xl mt-6 text-lg rounded-lg p-5 text-violet-100">Welcome to creature feature!
                Are you the adventurous type? 
                Have you seen some creatures and want to share
                them with your friends? Bugs, Birds, weird dogs? 
                Heck yeah! See who among your friends has seen the 
                freakiest creature.
                </p>
            </div>
        </div>
    );
}

export default Splashpage;