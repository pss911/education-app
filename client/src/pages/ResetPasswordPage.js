import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./styles.css";
import {
  CustomTextField,
  CustomButton,
  AuthRedirectLink,
  AuthError,
} from "../components/";

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
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword">
      <form className="resetpassword__form" onSubmit={resetPasswordHandler}>
        <h3 className="resetpassword__title">Reset Password</h3>
        {error && <AuthError error={error} />}
        {success && <AuthError isError={false} error={success} />}
        <CustomTextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          required
          autoFocus
        />
        <CustomTextField
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="small"
          required
        />
        <CustomButton text="Change Password" />
        <AuthRedirectLink text="Remember your Password? Login" path="/login" />
      </form>
    </div>
  );
}

export default ResetPasswordPage;
