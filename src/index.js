import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Artist from "./Artist";
import NoMatch from "./NoMatch";
import App from "./App";
import "./styles.css";
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <hr />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/artist/:artistId" component={Artist} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
ReactDOM.render(<Router />, document.getElementById("root"));
