import React from "react";
import "./styles.css";
import { Sidebar, Feed, Widgets } from "../containers";

function HomePage() {
  return (
    <div className="homepage">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default HomePage;
