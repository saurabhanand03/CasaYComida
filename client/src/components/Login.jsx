import React, { useState } from "react"
import {Link, Navigate} from "react-router-dom";

// Login page
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [goToHome, setGoToHome] = React.useState(false);

    // Navigates to home page when user correctly logs in
    if (goToHome) {
        return <Navigate to="/home" />;
      }

    // Handles page states for entering and submitting login info
    async function loginUser(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            setGoToHome(true);
        }
    }
    
    // Contents of the Login page is returned
    return (
        <div className="auth-form-container">
            <h2>Log In</h2>
            <form className="login-form">
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter Email" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" id="password" name="password"/>
                <Link className="link-btn" to={"/signup"}>Don't have an account? Sign up here</Link>
            </form>
            <button onClick={loginUser}>Login</button>
        </div>
    )
}
