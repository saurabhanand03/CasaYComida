import React, { useState } from "react"
import {Link, Navigate} from "react-router-dom";

// SignUp page
export const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [goToLogin, setGoToLogin] = React.useState(false);
    const [formErrors, setFormErrors] = useState({});

    if (goToLogin) {
        return <Navigate to= "/" />;
      }

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
			})
		})
        setFormErrors(validate(name, email, password, confirmPassword));
        if(response.ok) {
            setGoToLogin(true);
            alert("Account created! Please log in to continue.")
        }
	}

    const validate = (name, email, password, confirmPassword) => {
        const errors = {}
        if(!name){
            errors.name = "Name is required!";
        }
        if(!email){
            errors.email = "Email is required!";
        } else if(!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
            errors.email = "Invalid email!";
        }
        if(!password){
            errors.password = "Password is required!";
        } else if(!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(password)){
	    errors.password = "Password must have at least 8 charaters with uppercase and lowercase letters and numbers";
	}
        if(!confirmPassword){
            errors.confirmPassword = "Please confirm your password!";
        }else if(password !== confirmPassword){
            errors.confirmPassword = "Password does not match!";
        }
        return errors;
    }

    return (
        <div className="auth-form-container">
            <h2>Sign Up</h2>
            <form className="signup-form">
                <label htmlFor="name">Full Name</label>
                <input value={name} onChange={(event) => setName(event.target.value)} type="name" placeholder="Enter Full Name" id="name" name="name"></input>
                <p>{formErrors.name}</p>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter Email" id="email" name="email"></input>
                <p>{formErrors.email}</p>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" id="password" name="password"/>
                <p>{formErrors.password}</p>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword"/>
                <p>{formErrors.confirmPassword}</p>
                <Link className="link-btn" to={"/"}>Already have an account? Log in here</Link>
            </form>
            <button type="submit" onClick={registerUser}>Create Account</button>
        </div>
    )
}
