import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

function App() {

  // Current Page is initially the Login Page
  const [currentForm, setCurrentForm] = useState('login');

  // Toggle Page when "Log in here" or "Sign up here" buttons are pressed
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
