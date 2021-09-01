import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

function SidebarOption({ responsive, Icon, text, active, path }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(path);
  };
  return (
    <div
      onClick={handleClick}
      className={`sidebarOption ${active && "sidebarOption--active"}`}
    >
      <Icon />
      {!responsive ? <h2>{text}</h2> : ""}
    </div>
  );
}

export default SidebarOption;
