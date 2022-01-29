import React from "react";
import "./styles.css";
import { SidebarOption } from "../components/";

import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineHistory,
  AiOutlinePlus,
} from "react-icons/ai";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__icon">
        <h1 className="main_title">Study Ship!</h1>
        <h1 className="short_title">SS</h1>
      </div>

      {/* Sidebar Options */}
      <SidebarOption Icon={AiOutlineHome} text="Home" active path="/home" />
      <SidebarOption Icon={AiOutlineCompass} text="Explore" path="/explore" />
      <SidebarOption
        Icon={BookmarkBorderIcon}
        text="Bookmarks"
        path="/bookmarks"
      />
      <SidebarOption Icon={AiOutlineHistory} text="Activity" path="/activity" />
      <SidebarOption Icon={AiOutlinePlus} text="Add Post" path="/create" />
    </div>
  );
}

export default Sidebar;
