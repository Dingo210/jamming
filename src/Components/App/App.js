import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//hard coded values for playlist
const playlistName = 'Test List';
const playlistTracks = [];

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      searchResults: [{'name': '', 'artist': '', 'album': '', 'id': ''}],

      playlistName: playlistName,
      playlistTracks: playlistTracks
    };

addTrack(track) {
  if (this.state.playlistTracks.find(savedTrack =>
  savedTrack.id === track.id)) {
    return;
  }
}

  render() {
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <!-- Add a SearchBar component -->
      <div className="App-playlist">
        <SearchResults={this.state.SearchResults} />
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
      </div>
    </div>
  </div>
    );
  }
}

export default App;
