import React, { useState } from 'react';
import './App.css';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import Home from './components/Home';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/signup" element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;