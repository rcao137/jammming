import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

// common TrackList component shared by both SearchResult and Playlist, it is used to display tracks on
// from the list, different callbacks are passed from SearchResults and Playlist components, which will be
// further passed to the Track component
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
       {
         this.props.tracks.map(track =>{
         // onAdd callback is passed in from SearchResult components, onRemove callback is passed in from
         // Playlist component, isRemoval is true for Playlist, and false for SearchResults
         return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
       })}
     </div>);
   };
}

export default TrackList;
