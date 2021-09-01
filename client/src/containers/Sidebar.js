import React from "react";
import "./styles.css";
import { SidebarOption } from "../components/";
import { Button } from "@material-ui/core";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineHistory,
} from "react-icons/ai";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useHistory } from "react-router-dom";

function Sidebar() {
  const history = useHistory();

  const handleNewPostClick = () => {
    history.push("/create");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__icon">
        <h1>Education App!</h1>
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

      {/* Add Post Button */}
      <Button
        onClick={handleNewPostClick}
        variant="outline"
        fullWidth
        className="sidebar_post_button"
      >
        Add Post
      </Button>
    </div>
  );
}

export default Sidebar;
