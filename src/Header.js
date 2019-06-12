import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";
export default () => {
  return (
    <div className={classes.Header}>
      <h1 className={classes.Header_Title}>Itunes Search App</h1>
      <Link to="/" className={classes.Link_Search}>
        Search
      </Link>
    </div>
  );
};
