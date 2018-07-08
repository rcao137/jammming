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
const playlistTrack1 = {name: 'See You Again(feat. Charlie Puth)-1', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 100};
const playlistTrack2 = {name: 'See You Again(feat. Charlie Puth)-2', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 101};
const playlistTrack3 = {name: 'See You Again(feat. Charlie Puth)-3', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 102};
const playlistTracks = [playlistTrack1, playlistTrack2, playlistTrack3];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: searchResults,
                  playlistName: playlistName,
                  playlistTracks: playlistTracks};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    // Need to check foreach instead of find later
    let alreadyExist = false;
    this.state.playlistTracks.find(playlistTrack =>{
      if (playlistTrack.id === track.id) {
        alreadyExist = true;
        return;
      }
    })
    if (!alreadyExist) {
      const newPlaylistTracks = this.state.playlistTracks.push(track);
      this.setState(playlistTracks: newPlaylistTracks);
    }
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    let pos =  newPlaylistTracks.indexOf(track);
    if (pos >-1) {
      newPlaylistTracks.splice(pos, 1);
    }
    this.setState(playlistTracks: newPlaylistTracks);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
