import React from "react";
import "./styles.css";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  return (
    <div className="searchbar">
      <AiOutlineSearch className="searchbar__icon" />
      <input placeholder="Search Study Ship" type="text" />
    </div>
  );
}

export default SearchBar;
