import { useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const params = useParams();

  const resetPasswordHandler = async (e) => {
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
      const { data } = await axios.put(
        `/api/auth/resetpassword/${params.resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={resetPasswordHandler}>
        <h3>Reset Password</h3>
        {error && <span>{error}</span>}
        {success && (
          <span>
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Password:</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter Password Again"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
        <span>Remember your Password?</span> <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
