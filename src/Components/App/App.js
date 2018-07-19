import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

// dummy data to test out search results and playlist without the spotify integration
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

// App class serves as the main entry point for Jammming application.
// Initially it sets the default values for search results, playlist tracks, filtered results, and playlist name
// it defines callback methods to be passed into searchresult and playlist components
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [],
                  playlistName: 'New Play List',
                  playlistTracks: [],
                  filteredResults: []};
    // bind the methods to this object
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  // method to find tracks from spotify based on search criteria
  search(term) {
    // set the search result back to both search result and filtered result(filtered by tracks existing in playlist)
    let resulttracks = Spotify.search(term).then(unfilteredtracks=>{
      this.setState({searchResults: unfilteredtracks});
      // if playlist exists, remove the tracks in playlist from searchresult
      debugger
      let playlist = this.state.playlistTracks;
      if (playlist.length >0) {
        let newfilteredResults = unfilteredtracks.filter(searchResult => {
          // return !(playlist.indexOf(searchResult) >-1); IndexOf does not work here
          // filter out tracks exist inside playlist by comparing id
          let x = playlist.filter(track => track.id === searchResult.id);
          return (x.length == 0)
        });
        this.setState({filteredResults: newfilteredResults});
      } else {
        this.setState({filteredResults: unfilteredtracks});
      }
    });
  }

// method to pick a track from search result and add it to playlist
  addTrack(track) {
    // check if the track has already been added to the playlist, if added, then do not add it again.
    // But with the enhanced feature, this case will not happen in reality, because once the track
    // is added to the playlist, it will no longer show up in the search result
    let alreadyExist = false;
    this.state.playlistTracks.find(playlistTrack =>{
      if (playlistTrack.id === track.id) {
        alreadyExist = true;
        return;
      }
    })
    if (!alreadyExist) {
      // if the track has not yet been added in the playlist, then add it
      // Has to assign this.state.playlistTracks to another var since the array in this can not be modified using push
      const newPlaylistTracks = this.state.playlistTracks;
      newPlaylistTracks.push(track);
      this.setState({playlistTracks: newPlaylistTracks});
      // Only add the track to filtered search result if it does not exist in the playlist
      let newfilteredResults = this.state.searchResults.filter(searchResult =>{
//        return !(this.state.playlistTracks.indexOf(searchResult) >-1);
        // filter out tracks inside playlist by comparing id, 2 loops may not be time efficient
        let x = this.state.playlistTracks.filter(track => track.id === searchResult.id);
        return (x.length == 0)
      });
      this.setState({filteredResults: newfilteredResults});
    }
  }

// method to remove a track from playlist, once it is removed, it should show up in search result
// if it was part of the search result before
  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    // find the index of the track to be removed
    let pos =  newPlaylistTracks.indexOf(track);
    if (pos >-1) {
      // remove the track at the identified location
      newPlaylistTracks.splice(pos, 1);
    }
    this.setState({playlistTracks: newPlaylistTracks});

    // refilter the search result by the modified playlist, the removed track may or may not be added
    // back to the search result
    let newfilteredResults = this.state.searchResults.filter(searchResult =>{
//      return !(this.state.playlistTracks.indexOf(searchResult) >-1)
      let x = this.state.playlistTracks.filter(track => track.id === searchResult.id);
      return (x.length == 0)
    });
    this.setState({filteredResults: newfilteredResults});
  }

// method to change playlist name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

// method to save playlist to spotify
  savePlaylist(playlistName) {
    // get all URIs from the current playlist tracks
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    // create and save a playlist to spotify
    Spotify.saveplaylist(this.state.playlistName, trackURIs);
    // reset playlist back to new and empty
    this.setState({playlistTracks: [], playlistName: 'New Play List'});
    // refilter the search result by the modified playlist, the removed track may or may not be added
    // back to the search result
    let newfilteredResults = this.state.searchResults;
    this.setState({filteredResults: newfilteredResults});
  }


// render main page with searchbar, search result list and playlist
// pass in callbacks for search
// pass in callbacks onAdd for search result component
// pass in callbacks onRemove, on playlist name change and on playlist save to playlist Component
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.filteredResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
