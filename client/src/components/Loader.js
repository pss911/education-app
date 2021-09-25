import React, { useEffect, useState } from "react";
import "./styles.css";

function Loader({ waitFor }) {
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let timeout;
    if (waitFor) {
      timeout = setTimeout(() => {
        setNotFound(true);
      }, waitFor);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {!notFound ? (
        <div
          style={{
            widows: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="loader">
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
          </div>
        </div>
      ) : (
        "404"
      )}
    </>
  );
}

export default Loader;
