import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setError("Username or password is empty :(");
            return;
        }
        setError("");

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
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
                console.log("Logged in user:", data.user);

                localStorage.setItem("userId", data.user._id);

                navigate("/");
            }
        } catch (error){
            console.log("Could not fetch:", error);
            setError("Unable to connect to the server.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className=" shadow-[0_0_30px_5px_rgba(54,187,120)] p-8 rounded-2xl flex flex-col items-center gap-4 bg-green-400 box-shadow-4">
                <h2 className="text-3xl font-bold">Log in</h2>
                <label className="p-2">Password
                    <input className="m-2 p-1 rounded" value={password} name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>

                <label className="p-2">Username
                    <input className="m-2 p-1 rounded" value={username} name="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                </label>

                {error && <p>{error}</p>}

                <div className="flex flex-start">
                    <button className="hover:bg-green-700 bg-green-900 text-green-100 p-2 rounded m-1" type="submit">Submit</button>

                    <Link to="/splash">
                        <button className="hover:bg-green-700 bg-green-900 text-green-100 p-2 rounded m-1" type="button">Back</button>
                    </Link>
                </div>

            </form>
        </div>
    );
}

export default Login;

