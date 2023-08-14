import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./shared/Header/Header";
import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/auth/Login/Login";
import Signup from "./pages/auth/Signup/Signup";
import CheckYourEmail from "./pages/auth/Signup/CheckYourEmail";
import ConfirmEmail from "./pages/auth/Signup/ConfirmEmail";
import { AuthContext } from "./pages/auth/AuthContext/AuthContext";
import WelcomeForm from "./components/WelcomeForm";

interface LoginProps {
  onFormSwitch: (form: "login" | "signup") => void;
}

function App() {
  // here is a function that will set username in the AuthContext and you can use it in any component
  const { username, setUsername } = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      const loggedInUsername = foundUser.username;
      // console.log(username);
      setUsername(loggedInUsername);
    }
  }, []);

  return (
    <Router>
      <Header user={username} />
      <Routes>
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/home" element={<Home username={username} />} />
        <Route
          path="/login"
          element={
            <Login
              onFormSwitch={function (form: "login" | "signup"): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              onFormSwitch={function (form: "login" | "signup"): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route path="/check-your-email" element={<CheckYourEmail />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/" element={<WelcomeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
