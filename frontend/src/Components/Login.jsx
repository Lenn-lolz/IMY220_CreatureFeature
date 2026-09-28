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

    if (username.trim() ==="" || password.trim() ===""){ 
        setError("Username or password is empty :("); return;
    }
    setError("");

        try { const response = await fetch("http://localhost:3000/login",{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: username,password: password})
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                console.log(data.message);
                navigate("/");
            }
        }catch(error){
            console.log("could not fetch ");
        }
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Log in</h2>
                <label>Password 
                    <input value={password} name="username" type="text" onChange={(e) => setPassword(e.target.value)}></input>
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

export default Login;