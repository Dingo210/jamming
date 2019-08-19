import React, { Component } from "react";
import "./TrackList.css";

import Track from "../Track/Track";

class Tracklist extends React.Component {
  render() {
    const { tracks } = this.props;
    return (
      <div className="TrackList">
        {tracks &&
          tracks.length > 0 &&
          tracks.map(track => (
            <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          ))}
      </div>
    );
  }
}

export default Tracklist;
