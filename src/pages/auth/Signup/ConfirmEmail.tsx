import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../../services/auth/auth.service";
import "../../../App.css";

export default function ConfirmEmail() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function registerUser() {
      //   console.log(window.location);
      try {
        const origin = window.location.origin;
        const currentUrl = window.location.href;
        const url = currentUrl.replace(
          origin,
          "https://test-chat.duckdns.org/api"
        );

        const response = await authService.confirmEmail(url);
        if (response?.data.is_email_confirmed) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    registerUser();
  }, []);

  let content;
  if (!isVerified) {
    content = <h3>Verifying...</h3>;
  } else {
    content = (
      <div>
        <h3>Email is verified.</h3>
        <p className="confirm-email_par">
          Please <Link to="/login">sign in</Link>
        </p>
      </div>
    );
  }

  return content;
}
