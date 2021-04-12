import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

const Search = () => {
  return (
    <ButtonGroup size="small" variant="outlined">
      <TextField placeholder="search" />
      <Button>
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
};

export default Search;
