import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");
    const [ProfileImage, setProfileImage] = useState("");
    
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.trim() ==="" || password.trim()=== "") {
            setError("Username or password is empty :(");
            return;
        }

        if (password !==passwordConfirm) {
            setError("Passwords must match please");
            return;
        }
        setError("");
        try{
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            });
            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                setError(data.message);
                return;
            }

            if (data.success) {
                console.log(data.message);
                navigate("/");
            }

        } catch (error) {
            console.log("Could not fetch:", error);
            setError("Unable to connect to the server.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} 
            className=" shadow-[2px_5px_5px_2px_rgba(94,787,420)] p-8 rounded-2xl
             flex flex-col items-center gap-4 bg-teal-400 box-shadow-4">
                <h2 className="text-3xl font-bold font-Heading">Sign up</h2>
                <label>Password 
                    <input className="m-2 p-1 rounded bg-indigo-200 border-2 border-teal-900" value={password} name="username" type="text" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <label>Confirm Password 
                    <input  className="m-2 p-1 rounded bg-indigo-200 border-2 border-teal-900" value={passwordConfirm} name="username" type="text" onChange={(e) => setpasswordConfirm(e.target.value)}></input>
                </label>
                <label>Username 
                    <input className="m-2 p-1 rounded bg-indigo-200 border-2 border-teal-900" value={username} name="username" type="text"  onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                <label>Profile picture 
                    <img></img>
                    <input className="m-2 p-1 rounded bg-indigo-200 border-2 border-teal-900" value={ProfileImage} name="username" type="file"  onChange={(e) => setProfileImage(e.target.value)}></input>
                </label>
                {error && <p className="bg-rose-500 p-1 m-1">{error}</p>}
                <div className="flex flex-start">
                    <button className="hover:bg-green-700 bg-teal-900 text-green-100 p-2 rounded m-1" type="submit">Submit</button>
                    <Link to="/splash">
                        <button className="hover:bg-green-700 bg-teal-900 text-green-100 p-2 rounded m-1" type="button">Back</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;