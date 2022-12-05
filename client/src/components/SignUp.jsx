import React, { useState } from "react"
import {Link} from "react-router-dom";


// SignUp page
export const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function registerUser(event) {
		event.preventDefault();
		const response = await fetch('http://localhost:3001/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
                email,
				password,
                confirmPassword
			}),
		});
	}

    return (
        <div className="auth-form-container">
            <h2>Sign Up</h2>
            <form className="signup-form">
                <label htmlFor="name">Full Name</label>
                <input value={name} onChange={(event) => setName(event.target.value)} type="name" placeholder="Enter Full Name" id="name" name="name"></input>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter Email" id="email" name="email"></input>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" id="password" name="password"/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword"/>
                <Link className="link-btn" to={"/"}>Already have an account? Log in here</Link>
            </form>
            <button type="submit" onClick={registerUser}>Create Account</button>
        </div>
    )
}