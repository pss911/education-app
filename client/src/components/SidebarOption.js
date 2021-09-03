import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

function SidebarOption({ Icon, text, active, path, className }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(path);
  };
  return (
    <div
      onClick={handleClick}
      className={`sidebarOption ${active ? "sidebarOption--active" : ""} ${
        className ? className : ""
      }`}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
