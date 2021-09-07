import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./styles.css";
import {
  CustomTextField,
  CustomButton,
  AuthRedirectLink,
  AuthError,
} from "../components";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/home");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirm_password) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      setSuccess(
        "A Verification Email has been sent. You will be redirected to Login page in 5 Seconds. Please be sure to verify yourself before you login."
      );
      setTimeout(() => {
        setSuccess("");
        history.push("/login");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={registerHandler}>
        <h3 className="register__title">Register</h3>
        {error && <AuthError error={error} />}
        {success && <AuthError isError={false} error={success} />}
        <CustomTextField
          type="text"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          size="small"
          required
        />
        <CustomTextField
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          required
        />
        <CustomTextField
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          required
        />
        <CustomTextField
          type="password"
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="small"
          required
        />
        <CustomButton type="submit" text="Register" />
        <AuthRedirectLink text="Already have an account? Login" path="/login" />
      </form>
    </div>
  );
}

export default RegisterPage;
