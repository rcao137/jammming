let accessToken;
const clientID = '132f3979b8e5486f95c498a645f3a7d9';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
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
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`;
      }
    }
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
        if (jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name
          }));
        };
    });
  },

  saveplaylist(playlistName, trackURIs) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userID = '';
    let playlistID ='';


    if (playlistName !=='' && trackURIs!=='') {
      const generateJson = async () => {
      try {
        debugger
        console.log('starting...');
        // get userID
        const response = await fetch(`https://api.spotify.com/v1/me`, {headers: headers});
        if(response.ok){
          const jsonResponse = await response.json();
          // get user ID fron JsonResponse
          userID = jsonResponse.id;
          console.log(jsonResponse);
          console.log('userID:' + userID);

          try {
            //create a new empty playlist
            const response1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
              {headers: headers, method: 'POST', body: JSON.stringify({name: playlistName})})
            if(response1.ok){
              const jsonResponse1 = await response1.json();
              // get playlist id fron JsonResponse
              playlistID = jsonResponse1.id;
              console.log('playlistID:' + playlistID);

              try {
                //add URIs into the newly created playlist
                const response2 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                  {headers: headers, method: 'POST', body: JSON.stringify({uris: trackURIs})});
                if(response2.ok){
                  const jsonResponse2 = await response2.json();
                  // get snapshot ID back
                  const snapshotID = jsonResponse2.snapshot_id;
                  console.log('snapshotID:' + snapshotID);

                }
              } catch (error) {
                console.log(error);
              }
            }
        } catch (error) {
          console.log(error);
        }
        }
      } catch(error) {
        console.log(error);
      }
    } //async close

  } // if check for playlistName and URI list
} // close of saveplaylist
}

export default Spotify
