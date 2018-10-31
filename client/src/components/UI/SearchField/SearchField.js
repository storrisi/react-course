import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ onSearch }) => (
  <div>
    <label>Search by Name or Surname</label>
    <input
      type="text"
      onChange={event => onSearch(event.target.value.toLowerCase())}
    />
  </div>
);

SearchField.propTypes = {
  onSearch: PropTypes.func
};

export default SearchField;
