import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth/auth.service";
import "../../../App.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const url = `${import.meta.env.TEST_URL}user/password/request-reset`;
    try {
      const url =
        "https://test-chat.duckdns.org/api/user/password/request-reset";

      const data = {
        email,
      };
      const response = await authService.resetPassword(url, data);
      console.log(response);
      navigate("/check-your-email-reset-password");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="auth_wrapper">
      <div className="auth_form_wrapper">
        <h3>Forgot password?</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">
            Email Address
            <input
              type="text"
              placeholder="email"
              required
              autoComplete="off"
              id="email"
              value={email}
              onChange={onChange}
            />
          </label>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
