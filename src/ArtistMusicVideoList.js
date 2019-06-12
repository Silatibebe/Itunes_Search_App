import React, { Component } from "react";
import axios from "axios";
import Spinner from "./Spinner";
const cors = "https://cors-anywhere.herokuapp.com";
export default class ArtistMusicVideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      loading: false
    };
  }
  doSearchVideos = () => {
    this.setState({ loading: true });
    axios
      .get(
        `${cors}/https://itunes.apple.com/lookup?id=${Number(
          this.props.match.params.artistId
        )}&entity=musicVideo`
      )
      .then(res => {
        this.setState({ videos: res.data.results, loading: false });
      });
  };
  componentDidMount() {
    this.doSearchVideos();
  }
  render() {
    const videoList =
      this.state.videos.length > 0 &&
      this.state.videos.map(video => (
        <li key={video.trackId} style={{ listStyle: "none" }}>
          <img src={video.artworkUrl60} />
          <a target="_blank" href={video.previewUrl}>
            {video.trackName}
          </a>
        </li>
      ));
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return <div>{videoList}</div>;
    }
  }
}
