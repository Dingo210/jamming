import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.trackDuration = this.trackDuration.bind(this);
  }

  renderAction(isRemoval) {
    if (isRemoval) { return (<a className="Track-action" onClick={this.removeTrack}>-</a>); }
    else { return (<a className="Track-action" onClick={this.addTrack}>+</a>); }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderPreview(){
  if(!this.props.track.preview_url){
    return (<p>No preview available</p>);
  }else{
    return(<div><i className="fa fa-play-circle" onClick={this.playAudio}></i>
    <i className="fa fa-pause-circle"></i></div>);

  }
}

playAudio(){
  let url = this.props.track.preview_url;
  let x = new Audio(url);
  x.play();
}

trackDuration(){
  let duration = this.props.track.duration;
  let seconds = (Math.round(duration/1000))%60;
  let minutes = Math.floor((Math.round(duration/1000))/60);
  if(seconds===0){
    seconds = '00';
  }else if(seconds < 10){
    let place = seconds;
    seconds = `0${place}`;
  }else{
    seconds = seconds;
  }
  return `${minutes}:${seconds}`;
}

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        { this.renderAction(this.props.isRemoval) }
      </div>
    );
  }
}

export default Track;
