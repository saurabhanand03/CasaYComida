import React, { useState } from "react"
import {Link} from "react-router-dom";


// SignUp page
export const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handles page states for entering and submitting login info
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
    }

    return (
        <div className="auth-form-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} onChange={(event) => setName(event.target.value)} type="name" placeholder="Enter Full Name" id="name" name="name"></input>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter Email" id="email" name="email"></input>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(event) => setUsername(event.target.value)} type="username" placeholder="Enter Username" id="username" name="username"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" id="password" name="password"/>
                {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Log in here</button> */}
                <Link className="link-btn" to={"/"}>Already have an account? Log in here</Link>
            </form>
            <button type="submit">Create Account</button>
        </div>
    )
}