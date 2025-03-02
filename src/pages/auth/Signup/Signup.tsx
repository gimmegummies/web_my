import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth/auth.service";
import "../../../App.css";

interface SignupProps {
  onFormSwitch: (form: "login" | "signup") => void;
}

export default function Signup({ onFormSwitch }: SignupProps) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [type]: e.target.value,
    });
  };

  const handleSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "https://test-chat.duckdns.org/api/register/";
      const data = {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      };

      const response = await authService.signup(url, data);
      console.log(response);
      if (!response) throw new Error("Response is undefined");
      navigate("/check-your-email");
    } catch (error: any) {
      if (error instanceof Array) {
        // handle array of errors
        error.forEach((err) => {
          alert(err[0]);
        });
      } else if (error instanceof Error) {
        // handle single error
        console.error(error.message);
      } else {
        // handle unexpected error object
        console.error(error);
      }
    }
  };

  return (
    <div className="auth_wrapper">
      <div className="auth_form_wrapper">
        <h3>Sign up</h3>
        <form onSubmit={handleSignup}>
          <label htmlFor="user">user name</label>
          <input
            type="text"
            placeholder="user name"
            required
            autoComplete="off"
            id="user"
            value={formState.username}
            onChange={(e) => onChange(e, "username")}
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            placeholder="user@gmail.com"
            required
            autoComplete="off"
            id="email"
            value={formState.email}
            onChange={(e) => onChange(e, "email")}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="********"
            required
            autoComplete="off"
            id="password"
            value={formState.password}
            onChange={(e) => onChange(e, "password")}
          />
          <button type="submit">Sign up</button>
        </form>
        <button className="linkBtn" onClick={() => onFormSwitch("login")}>
          Already have an account? Login here
        </button>
      </div>
    </div>
  );
}
