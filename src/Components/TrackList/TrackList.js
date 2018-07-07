import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const track = this.props.tracks.map(track =>{
      console.log(track.name);
//      return (<Track track={track} key={track.id} />)
    })

    const searchResult1 = {name: 'Tiny Dancer1', artist: 'Elton John', album: 'Madman Across The Water', id: 1};
    const searchResult2 = {name: 'Tiny Dancer2', artist: 'Elton John', album: 'Madman Across The Water', id: 2};
    const searchResult3 = {name: 'Tiny Dancer3', artist: 'Elton John', album: 'Madman Across The Water', id: 3};
    const searchResults = [searchResult1, searchResult2, searchResult3];
    return (
      <div className="TrackList">
       {track}
     </div>);
   }
}


TrackList.defaultProps = [];

export default TrackList;
