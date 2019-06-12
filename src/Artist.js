import React, { Component } from "react";
import axios from "axios";
import { Link, Route, NavLink } from "react-router-dom";
import ArtistTrackList from "./ArtistTrackList";
import ArtistAlbumList from "./ArtistAlbumList";
import ArtistMusicVideoList from "./ArtistMusicVideoList";
const cors = "https://cors-anywhere.herokuapp.com";
export default class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `${cors}/https://itunes.apple.com/lookup?id=${
        this.props.match.params.artistId
      }`
    );

    this.setState({ artist: res.data.results[0] });
  }
  render() {
    return (
      <div>
        <div>
          <h1>{this.state.artist ? this.state.artist.artistName : ""} </h1>
          <span>
            {this.state.artist ? this.state.artist.primaryGenreName : ""}
          </span>
        </div>
        <div>
          <NavLink to={`/artist/${this.props.match.params.artistId}/tracks`}>
            Tracks
          </NavLink>
          |
          <NavLink to={`/artist/${this.props.match.params.artistId}/albums`}>
            Albums
          </NavLink>
          |
          <NavLink to={`/artist/${this.props.match.params.artistId}/videos`}>
            Videos
          </NavLink>
        </div>
        <div>
          <Route path="/artist/:artistId/tracks" component={ArtistTrackList} />
          <Route path="/artist/:artistId/albums" component={ArtistAlbumList} />
          <Route
            path="/artist/:artistId/videos"
            component={ArtistMusicVideoList}
          />
        </div>
      </div>
    );
  }
}
