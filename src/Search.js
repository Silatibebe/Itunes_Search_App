import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import axios from "axios";
import Spinner from "./Spinner";
import classes from "./Search.module.css";

const cors = "https://cors-anywhere.herokuapp.com";
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      artistsResults: [],
      loading: false
    };
  }
  doSearch = e => {
    e.preventDefault();
    if (this.state.searchTerm.length == 0) {
      alert("please enter a search term!");
      return;
    }
    this.setState({ loading: true });
    axios
      .get(
        `${cors}/https://itunes.apple.com/search?term=${
          this.state.searchTerm
        }&limit=20`
      )
      .then(res => {
        this.setState({
          artistsResults: res.data.results,
          loading: false,
          searchTerm: ""
        });
      });
  };

  //onChange
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    //to implement the auto search feature
  };
  //componentDidMount
  componentDidMount() {
    const artistsResults = JSON.parse(localStorage.getItem("artistsResults"));
    //console.log('--------------------',artistsResults);
    this.setState({ artistsResults });
  }
  //componentDidUpdate
  componentDidUpdate() {
    const artistsResults = JSON.stringify(this.state.artistsResults);
    localStorage.setItem("artistsResults", artistsResults);
  }
  render() {
    const liStyle = {
      listStyle: "none"
    };
    const artistsList =
      this.state.artistsResults.length > 0 &&
      this.state.artistsResults.map(track => (
        <div>
          <li key={track.trackId} style={liStyle}>
            <img src={track.artworkUrl30} alt={track.trackName} />
            <Link to={`/artist/${track.artistId}/tracks`}>
              {" "}
              {track.trackName}
              <span> by {track.artistName}</span>
            </Link>
          </li>
        </div>
      ));
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <SearchForm
            doSearch={this.doSearch}
            searchTerm={this.state.searchTerm}
            onChange={this.onChange}
          />

          {this.state.artistsResults.length > 0 && (
            <h2>You have {this.state.artistsResults.length} results.</h2>
          )}
          {artistsList}
        </React.Fragment>
      );
    }
  }
}
