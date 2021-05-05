import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

const Search = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const handleUpdate = (e) => {
    setSearch(e.target.value);
  };

  const searchGames = async (e) => {
    e.preventDefault();
    history.push(`/search/${search}`);
    setSearch("");
  };

  return (
    <form onSubmit={searchGames}>
      <ButtonGroup size="small" variant="outlined">
        <TextField
          value={search}
          onChange={handleUpdate}
          placeholder="search"
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default Search;
