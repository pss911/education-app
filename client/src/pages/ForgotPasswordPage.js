import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import {
  CustomTextField,
  CustomButton,
  AuthRedirectLink,
  AuthError,
} from "../components/";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        {
          email,
        },
        config
      );

      setSuccess(data.data);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword">
      <form className="forgotpassword__form" onSubmit={forgotPasswordHandler}>
        <h3 className="forgotpassword__title">Forgot Password</h3>
        {error && <AuthError error={error} />}
        {success && <AuthError isError={false} error={success} />}
        <CustomTextField
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          required
          autoFocus
        />
        <CustomButton text="Send Email" />
        <AuthRedirectLink path="/login" text="Remember your Password? Login" />
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
