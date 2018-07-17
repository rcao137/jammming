import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

/*
const searchResults1 = {name: 'song1', artist: 'artist1', album: 'album1', id: 1};
const searchResults2 = {name: 'song2', artist: 'artist2', album: 'album2', id: 2};
const searchResults3 = {name: 'song3', artist: 'artist3', album: 'album1', id: 3};
const searchResults = [searchResults1, searchResults2, searchResults3];

const playlistName = 'New play list';
const playlistTrack1 = {name: 'See You Again(feat. Charlie Puth)-1', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 100};
const playlistTrack2 = {name: 'See You Again(feat. Charlie Puth)-2', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 101};
const playlistTrack3 = {name: 'See You Again(feat. Charlie Puth)-3', artist: 'Wiz Khalifa', album: 'See You Again (feat. Charlie Puth)', id: 102};
const playlistTracks = [playlistTrack1, playlistTrack2, playlistTrack3];
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [],
                  playlistName: 'New Play List',
                  playlistTracks: []};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    // check if the track has already added to the playlist
    let alreadyExist = false;
    this.state.playlistTracks.find(playlistTrack =>{
      if (playlistTrack.id === track.id) {
        alreadyExist = true;
        return;
      }
    })
    if (!alreadyExist) {
      // Has to assign it to another var, this.state.playlistTracks can not be modified using push
      const newPlaylistTracks = this.state.playlistTracks;
      newPlaylistTracks.push(track);
      this.setState({playlistTracks: newPlaylistTracks});
    }
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    // find the index of the track to be removed
    let pos =  newPlaylistTracks.indexOf(track);
    if (pos >-1) {
      // remove 1 track at the identified location
      newPlaylistTracks.splice(pos, 1);
    }
    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(playlistName) {
    // get all URIs from the current playlist tracks
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    // create and save a playlist
    Spotify.saveplaylist(this.state.playlistName, trackURIs);
    // reset playlist back to new and empty
    this.setState({playlistTracks: [], playlistName: 'New Play List'});
  }



  search(term) {
    console.log(this.state);
  // add a new feature to filter out the search result by tracks in playlist
/*  let resulttracks = Spotify.search(term).then(filteredtracks=>{
    this.setState({searchResults: filteredtracks})});
*/
    let resulttracks = Spotify.search(term).then(tracks=>{
      let filteredtracks = tracks.filter(function(track) {
        debugger
        if (this.state.playlistTracks == undefined || this.state.playlistTracks.length < 1) {
//        if ((!Array.isArray(this.state.playlistTracks) || !this.state.playlistTracks.length) ) {
          return true;
        }
        else {
          if (this.state.playlistTracks.length === 0) {
            return true;
          }
          else {
            if (!this.state.playlistTracks.includes(track)) {
              return true;
            }
            else {
              return false;
            }
          }
        }
      }
    )
    return filteredtracks;
    }).then(filteredtracks=>{
      this.setState({searchResults: filteredtracks})});


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
