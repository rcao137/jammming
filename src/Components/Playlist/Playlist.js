import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

// playlist class to display playlist, save playlist and remove tracks from playlist
class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

// callback to update playlist name
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

// render playlist, with passed in prop to handle onRemove callback, tracks on playlist can be removed
// although searchResult and Playlist are sharing the same Tracklist/Track components, they behave
// differently by passing in different props from App component
  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>);
  }
}

export default Playlist;
