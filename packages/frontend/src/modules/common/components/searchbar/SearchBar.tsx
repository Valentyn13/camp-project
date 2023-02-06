import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import React from 'react';
// e target problems!!!
export const SearchBar = ({ setSearchQuery }: any) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e);
      }}
      label="Enter a title"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: 'blue' }} />
    </IconButton>
  </form>
);
