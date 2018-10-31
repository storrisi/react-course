import React from "react";

const SearchField = ({ onSearch }) => (
  <div>
    <label>Search by Name or Surname</label>
    <input
      type="text"
      onChange={event => onSearch(event.target.value.toLowerCase())}
    />
  </div>
);

export default SearchField;
