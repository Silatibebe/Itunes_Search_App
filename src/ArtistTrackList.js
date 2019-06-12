import React, { Component } from "react";
import axios from "axios";
import Spinner from "./Spinner";
const cors = "https://cors-anywhere.herokuapp.com";
export default class ArtistTrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      loading: false
    };
  }
  doSearchTracks() {
    this.setState({ loading: true });
    axios
      .get(
        `${cors}/https://itunes.apple.com/lookup?id=${Number(
          this.props.match.params.artistId
        )}&entity=song`
      )
      .then(res => {
        this.setState({ tracks: res.data.results, loading: false });
        // console.log(res.data.results);
      });
  }
  componentDidMount() {
    this.doSearchTracks();
  }
  render() {
    const trackList = this.state.tracks.map(track => (
      <li key={track.trackId} style={{ listStyle: "none" }}>
        <img src={track.artworkUrl30} />
        <a target="_blank" href={track.trackViewUrl}>
          {track.trackName}
        </a>
      </li>
    ));
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return <div>{trackList}</div>;
    }
  }
}
