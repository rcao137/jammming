import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {

  render() {
    console.log('Track passed into TrackList.js:' + this.props.searchResults);
    this.props.searchResults.map(track =>{
         console.log(track.name)
       })

    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} />
      </div>);
  }
}

export default SearchResults;
