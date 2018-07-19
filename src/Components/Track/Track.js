import React from 'react';
import './Track.css';

// Track component to display detail tracks from the tracklist.
class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

// callback for adding a track to the list
  addTrack() {
    this.props.onAdd(this.props.track);
  }

// callback for removing a track to the list
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

// render add or remove track link based on isRemove props
  renderAction(){
    return(this.props.isRemoval?
      <a className="Track-action" onClick={this.removeTrack}>-</a> : <a className="Track-action" onClick={this.addTrack}>+</a>);
  }

// Render detailed track attributes, and +, - tracks links
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <audio id="myAudio" controls>
            <source src={this.props.track.preview} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio><br/>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>)
  }
}

export default Track;
