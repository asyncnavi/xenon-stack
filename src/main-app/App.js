import React from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Login from "../routes/login";
import Signup from "../routes/signup";
import Contact from "../routes/contact";
import {auth, signOut} from "../firebase";
import Home from "../routes/home";

const App = () => {
  return(
      <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/contact" element={<Contact/>} />

            </Routes>
      </BrowserRouter>
  )
}


export default App;