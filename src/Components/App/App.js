import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const searchResult1 = {name: 'Tiny Dancer1', artist: 'Elton John', album: 'Madman Across The Water', id: 1};
const searchResult2 = {name: 'Tiny Dancer2', artist: 'Elton John', album: 'Madman Across The Water', id: 2};
const searchResult3 = {name: 'Tiny Dancer3', artist: 'Elton John', album: 'Madman Across The Water', id: 3};
const searchResults = [searchResult1, searchResult2, searchResult3];

const playlistName = 'New play list';
const playlistTrack = {name: 'See You Again(feat. Charlie Puth)', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 123};
const playlistTracks = [playlistTrack, playlistTrack, playlistTrack];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: searchResults,
                  playlistName: playlistName,
                  playlistTracks: playlistTracks};
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} />
          <Playlist playlistname={playlistName} playlistTracks={playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
