import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { useHistory } from "react-router-dom";
import {
  CustomTextField,
  CustomButton,
  AuthRedirectLink,
  AuthError,
} from "../components/";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/home");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.push("/home");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={loginHandler}>
        <h3 className="login__title">Login</h3>
        {error && <AuthError error={error} />}
        <CustomTextField
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
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
        <CustomButton text="Login" />
        <AuthRedirectLink path="/forgotpassword" text="Forgot Password?" />
        <AuthRedirectLink
          path="/register"
          text="Don't Have an Account? Sign Up"
        />
      </form>
    </div>
  );
}

export default LoginPage;
