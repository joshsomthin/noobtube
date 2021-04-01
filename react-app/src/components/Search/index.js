import React from "react";
import SvgIcon from "@material-ui/icons";

const Search = () => {
  return (
    <div className="search-div">
      <input></input>
      <button>
        <img
          className="search-icon"
          src={process.env.PUBLIC_URL + "/search.jpg"}
          alt="search"
        />
      </button>
    </div>
  );
};

export default Search;
