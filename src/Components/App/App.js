import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';

const searchResults1 = {name: 'song1', artist: 'artist1', album: 'album1', id: 1};
const searchResults2 = {name: 'song2', artist: 'artist2', album: 'album2', id: 2};
const searchResults3 = {name: 'song3', artist: 'artist3', album: 'album1', id: 3};
const searchResults = [searchResults1, searchResults2, searchResults3];

const playlistName = 'New play list';
const playlistTrack1 = {name: 'See You Again(feat. Charlie Puth)-1', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 100};
const playlistTrack2 = {name: 'See You Again(feat. Charlie Puth)-2', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 101};
const playlistTrack3 = {name: 'See You Again(feat. Charlie Puth)-3', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 102};
const playlistTracks = [playlistTrack1, playlistTrack2, playlistTrack3];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [],
                  playlistName: 'New Play List',
                  playlistTracks: []};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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
      // Has to assign it to another var, this.state can not be modified using push
      const newPlaylistTracks = this.state.playlistTracks;
      newPlaylistTracks.push(track);
      this.setState({playlistTracks: newPlaylistTracks});
    }
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    let pos =  newPlaylistTracks.indexOf(track);
    if (pos >-1) {
      newPlaylistTracks.splice(pos, 1);
    }
    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(playlistName) {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.saveplaylist(this.state.playlistName, trackURIs);
    // reset playlist back to new
    this.setState({playlistName: 'New Play List'});
    this.setState({playlistTracks: []});
  }

  search(term) {
   Spotify.search(term).then(tracks =>{
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
