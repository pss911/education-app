import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <h3>Verify Account</h3>
      {error && <span>{error}</span>}
      {success && (
        <span>
          {success} <Link to="/login">Login</Link>
        </span>
      )}
      <form onSubmit={verifyHandler}>
        <button type="submit">Verify Account</button>
      </form>
    </div>
  );
}

export default VerifyAccountPage;
