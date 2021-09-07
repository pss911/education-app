import React from "react";
import "./styles.css";

function AuthError({ error, isError }) {
  return (
    <span
      className={
        isError === false ? "login__error login__success" : "login__error"
      }
    >
      {error}
    </span>
  );
}

export default AuthError;
