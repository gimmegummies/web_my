import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import authService from "../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
// import styles from "./Login.module.scss";
import "../../../App.css";

interface LoginProps {
  onFormSwitch: (form: "login" | "signup") => void;
}

export default function Login({ onFormSwitch }: LoginProps) {
  const { setUsername } = useContext(AuthContext);

  const [formState, setFormState] = useState({
    username: "",
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

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const url = `${import.meta.env.TEST_URL}login/`;
    try {
      const url = "https://test-chat.duckdns.org/api/login/";

      const data = {
        username: formState.username,
        password: formState.password,
      };
      const response = await authService.login(url, data);
      // console.log(response);
      // if (!response) throw new Error("Response is undefined");

      setUsername(response.user.username);
      localStorageService.set("user", response.user);
      navigate("/home");
    } catch (error: any) {
      alert(error.Invalid);
    }
  };

  return (
    <div className="auth_wrapper">
      <div className="auth_form_wrapper">
        <h3>Login</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="user">
            user name
            <input
              type="text"
              placeholder="user name / email"
              required
              autoComplete="off"
              id="user"
              value={formState.username}
              onChange={(e) => onChange(e, "username")}
            />
          </label>
          <label htmlFor="password">
            password
            <input
              type="password"
              placeholder="********"
              required
              autoComplete="off"
              id="password"
              value={formState.password}
              onChange={(e) => onChange(e, "password")}
            />
          </label>

          <NavLink className={"forget_psw_link"} to={"/forgotpassword"}>
            Forgot password?
          </NavLink>

          <button type="submit">Log in</button>
        </form>
        <button className="linkBtn" onClick={() => onFormSwitch("signup")}>
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
}
