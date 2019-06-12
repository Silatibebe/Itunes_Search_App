import React from "react";
export default ({ doSearch, searchTerm, onChange }) => (
  <form onSubmit={doSearch}>
    <input
      type="text"
      name="searchTerm"
      value={searchTerm}
      onChange={onChange}
    />
    <input type="submit" value="search" />
  </form>
);
