import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setError("Username or password is empty :(");
            return;
        }

        if (password !== passwordConfirm) {
            setError("Passwords must match");
            return;
        }
        setError("");
        try {
            const response = await fetch("http://localhost:3000/signup", {
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
                navigate("/");
            }

        } catch (error) {
            console.log("Could not fetch:", error);
            setError("Unable to connect to the server.");
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <label>Password 
                    <input value={password} name="username" type="text" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <label>Confirm Password 
                    <input value={passwordConfirm} name="username" type="text" onChange={(e) => setpasswordConfirm(e.target.value)}></input>
                </label>
                <label>Username 
                    <input value={username} name="username" type="text"  onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                {error && <p>{error}</p>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;