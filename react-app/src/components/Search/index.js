import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { searchVideoGames } from "../../store/videos";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleUpdate = (e) => {
    setSearch(e.target.value);
  };

  const searchGames = async (e) => {
    e.preventDefault();
    await dispatch(searchVideoGames(search));
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
