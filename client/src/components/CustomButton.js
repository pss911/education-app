import React from "react";
import { Button } from "@material-ui/core";
import "./styles.css";

function CustomButton({ text, noMargin, notSubmit, onClick }) {
  return (
    <div className="custom_button">
      <Button
        variant="contained"
        className={noMargin ? "noMargin" : ""}
        type={!notSubmit ? "submit" : ""}
        onClick={onClick}
        disableElevation
        fullWidth
      >
        {text}
      </Button>
    </div>
  );
}

export default CustomButton;
