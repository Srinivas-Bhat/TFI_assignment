import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import AddVolunteer from "./AddVolunteer/AddVolunteer";
import Signup from "./Signup/Signup";
import Volunteers from "./Volunteers/Volunteers";

const AllRoutes = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/voluteer" element={<Volunteers/>} />
        <Route path="/register" element={<AddVolunteer/>} />
      </Routes>
    </>
  );
};

export default AllRoutes;
