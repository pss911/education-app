import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { CustomButton, AuthError } from "../components/";
import { useParams } from "react-router-dom";

function VerifyAccountPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const params = useParams();

  const verifyHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/auth/verify/${params.verifyToken}`,
        {},
        {}
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
    <div className="verify">
      <form className="verify__form" onSubmit={verifyHandler}>
        <h3 className="verify__title">Verify Account</h3>
        {error && <AuthError error={error} />}
        {success && <AuthError isError={false} error={success} />}
        <CustomButton text="Verify Account" />
      </form>
    </div>
  );
}

export default VerifyAccountPage;
