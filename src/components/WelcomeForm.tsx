import React, { useState } from "react";
import Login from "../pages/auth/Login/Login";
import Signup from "../pages/auth/Signup/Signup";
import "./WelcomeForm.scss";

type FormName = "login" | "signup";

interface FormSwitchProps {
  onFormSwitch: (formName: FormName) => void;
}

export default function WelcomeForm() {
  const [currentForm, setCurrentForm] = useState<FormName>("login");

  const toggleForm: (formName: FormName) => void = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="WelcomeForm">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Signup onFormSwitch={toggleForm} />
      )}
    </div>
  );
}
