import { Link } from "react-router-dom";
import "./styles.css";
import React from "react";

function AuthRedirectLink({ text, path }) {
  return (
    <Link className="auth__redirect" to={path}>
      {text}
    </Link>
  );
}

export default AuthRedirectLink;
