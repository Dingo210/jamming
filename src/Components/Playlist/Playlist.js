import React from 'react'
import PropTypes from 'prop-types'
import './PlayList.css'
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
  static propTypes = {
    onNameChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleNameChange = this.handleNameChange.bind(this)
  }


  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange} />
        <TrackList
          onRemove={this.props.onRemove}
          tracks={this.props.playlistTracks} />
        <a className="Playlist-save"
          onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
      </div>
    )
  }
}
export default Playlist
