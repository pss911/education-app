import React from "react";

function AuthError({ error, isError }) {
  return (
    <span className={!isError ? "login__error login_success" : "login_error"}>
      {error}
    </span>
  );
}

export default AuthError;
