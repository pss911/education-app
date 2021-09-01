import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={forgotPasswordHandler}>
        <h3>Forgot Password</h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Send Email</button>
        <span>Remember your Password?</span> <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
