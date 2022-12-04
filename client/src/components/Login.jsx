import React, { useState } from "react"
import {Link, Navigate} from "react-router-dom";

// Login page
export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [goToHome, setGoToHome] = React.useState(false);

    if (goToHome) {
        return <Navigate to="/home" />;
      }

    // Handles page states for entering and submitting login info
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
    }
    
    return (
        <div className="auth-form-container">
            <h2>Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(event) => setUsername(event.target.value)} type="username" placeholder="Enter Username" id="username" name="username"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" id="password" name="password"/>
                <Link className="link-btn" to={"/signup"}>Don't have an account? Sign up here</Link>
            </form>
            <button
                onClick={() => {
                setGoToHome(true);
                }}
            >Login</button>
        </div>
    )
}