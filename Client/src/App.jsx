import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PokemonList from "./components/PokemonList";
import PokemonCard from "./components/PokemonCard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserSettings from "./pages/UserSettings";
// Functions
import { getSelf } from "./services/api";
import { setUser } from "./store/slices/userSlice";
import { getCookie } from "./services/cookies";

import './App.css'
import Error404 from "./pages/Error404";

const App = () => {
  const dispatch = useDispatch();
  if(!localStorage.getItem("themeMode")) localStorage.setItem('themeMode', "light");

  const reloadUser = async () => {
    const token = getCookie('token');
    
    if (token) {
        const user = await getSelf(token);
        if(user)
          dispatch(setUser(user));
    }
  }

  useEffect( () => {
    reloadUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-settings" element={<UserSettings />} />

        <Route path="*" element={<Error404 />} />

      </Routes>
    </Router>
  );
};

export default App;