import React, { Component } from "react";
import axios from "axios";
import Spinner from "./Spinner";
const cors = "https://cors-anywhere.herokuapp.com";
export default class ArtistAlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      loading: false
    };
  }
  doSearchAlbums = () => {
    this.setState({ loading: true });
    axios
      .get(
        `${cors}/https://itunes.apple.com/lookup?id=${Number(
          this.props.match.params.artistId
        )}&entity=album`
      )
      .then(res => {
        this.setState({ albums: res.data.results, loading: false });
      });
  };
  componentDidMount() {
    this.doSearchAlbums();
  }
  render() {
    const albumList = this.state.albums.map(album => (
      <li key={album.trackId} style={{ listStyle: "none" }}>
        <img src={album.artworkUrl60} />
        <a href={album.collectionViewUrl}>{album.collectionName}</a>
      </li>
    ));
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return <div>{albumList}</div>;
    }
  }
}
