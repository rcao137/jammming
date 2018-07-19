let accessToken;
// registered Client ID to access spotify APIs
const clientID = '132f3979b8e5486f95c498a645f3a7d9';
// const redirectURI = 'http://playlist-rc.surge.sh/';
const redirectURI = 'http://localhost:3000/';

// This module is a utility service to integration Jammming application with spotify APIs
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      // get spotify access token
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = parseInt(expiresInMatch[1], 10);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }
      else {
        // For the 1st time access, need to set response type to playlist-modify-private in order to create the playlist
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`;
      }
    }
  },

// method to get search result from spotify search API
  search(term) {
    // get access token
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      // check if the response is successful for the API call
      debugger
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }).then(jsonResponse => {
        // get tracks from item list
        debugger
        if (!jsonResponse.tracks.items){
          // if nothing is returned, return an empty array
          return [];
        }
        else {
          // get search results back and map them to track structure for later display
          return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          preview: track.preview_url,
          }));
        }
    });
  },

// method to save identified playlist to spotify
  saveplaylist(playlistName, trackURIs) {
    // get access token
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID = '';
    let playlistID ='';
    let snapshotID = '';

// only call spotify API if playlist name and the tracks to save are available
    if (playlistName !=='' && trackURIs!=='') {
      //get userID from spotify through spotify API
      return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
      ).then(response => {
//        debugger
        if (response.ok) {
          return response.json();
        }
        else {
          console.log('failed get userID');
        }
      }).then(jsonResponse => {
        // get the userID from current session in order to save the list for the user
        if (jsonResponse.id) {
          userID = jsonResponse.id;
        }
        // create a new playlist through spotify API
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
          {headers: headers, method: 'POST', body: JSON.stringify({name: playlistName})}
        ).then(response => {
//          debugger
          // verify if the playlist is created successfully on Spotify
          if (response.ok) {
            return response.json();
          }
          else {
            console.log('failed create new playlist');
          }
        }).then(jsonResponse => {
//           debugger
          // get the newly created list ID from response
          if (jsonResponse.id) {
            playlistID = jsonResponse.id;
          }
          // add playlist to the newly created spotify playlist
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
        {headers: headers, method: 'POST', body: JSON.stringify({uris: trackURIs})});
       });
     });
   }
 }
};

export default Spotify
