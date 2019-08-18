import React, { Component } from "react";
import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return;
    }

    let newPlaylistTracks = this.state.playlistTracks;
    newPlaylistTracks.push(track);

    this.setState({ playlistTracks: newPlaylistTracks });
  }

  removeTrack(track) {
    let trackIndex = 0;

    this.state.playlistTracks.map(savedTrack => {
      if (savedTrack.id === track.id) {
        trackIndex = this.state.playlistTracks.indexOf(savedTrack);
      }
    });

    let newPlaylistTracks = this.state.playlistTracks;
    newPlaylistTracks.splice(trackIndex, 1);

    this.setState({ playlistTracks: newPlaylistTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(savedTrack => savedTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState({ playlistName: "New Playlist", playlistTracks: [] });
  }

  async search(term) {
    try {
      const newSearch = await Spotify.search(term);
      this.setState({ searchResults: newSearch });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
