import logo from './logo.svg';
import './App.css';
import { useState } from "react";

import Navbar from './components/Navbar/index';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login/signinForm';
import  SignupForm  from './pages/Login/signupForm';
import {AccountBox} from './pages/Login/index'

function App() {


   return (
    <BrowserRouter>
    <main>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<AccountBox/>} />
            <Route path="/navbar" element={<Navbar/>} />
        </Routes>
    </main>
</BrowserRouter>
    
  );
}

export default App;
