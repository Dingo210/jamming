const redirectURI = 'http://localhost:3000/';
const clientID = '9c5bdfffb43c4957ae5f2a1ff29cb938';


let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') {
      console.log('Access token was already set.');
      return accessToken;
    }

    let accessTokenArray = window.location.href.match(/access_token=([^&]*)/);
    let expiresInArray = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenArray && expiresInArray) {
      console.log('Grabbed access token from URL:\n'+accessTokenArray[1]+'\n'+expiresInArray[1]);
      accessToken = accessTokenArray[1];
      let expiresIn = Number(expiresInArray[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
  } else {
    console.log('Redirect to authorize.');
      const endpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = endpoint;
      return false;
  }
},

async search(term) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const currentAccessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${currentAccessToken}`
    };

    try {
          const response = await fetch(endpoint, { headers: headers });
          if (response.ok) {
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
              return [];
            } else {
              const foundTracks = jsonResponse.tracks.items.map(track => (
                { name: track.name, artist: track.artists[0].name, album: track.album.name, id: track.id, uri: track.uri }
              ));
              return foundTracks;
            }
          }
        }
        catch(error) {
          console.log(error);
        }
      },

      async savePlaylist(playlistName, playlistTracks) {
        if (!playlistName || !playlistTracks || playlistTracks.length === 0) {
          return;
        }

        const currentAccessToken = this.getAccessToken();
        const userIdHeaders = {
          Authorization: `Bearer ${currentAccessToken}`,
        };
        const playlistHeaders = {
          Authorization: `Bearer ${currentAccessToken}`,
          'Content-Type': 'application/json'
        };

        try {
          const getUserIdEndpoint = 'https://api.spotify.com/v1/me';
          const getUserIdResponse = await fetch(getUserIdEndpoint, { headers: userIdHeaders });
          if (getUserIdResponse.ok) {
            const jsonGetUserIdResponse = await getUserIdResponse.json();
            const userId = jsonGetUserIdResponse.id;

            const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
            const createPlaylistData = JSON.stringify({ name: playlistName, public: true });
            const createPlaylistResponse = await fetch(createPlaylistEndpoint, { method: 'POST', headers: playlistHeaders, body: createPlaylistData });
            if (createPlaylistResponse.ok) {
              const jsonCreatePlaylistResponse = await createPlaylistResponse.json();
              const playlistId = jsonCreatePlaylistResponse.id;

              const addTracksEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
              const addTracksData = JSON.stringify({ uris: playlistTracks });
              const addTracksResponse = await fetch(addTracksEndpoint, { method: 'POST', headers: playlistHeaders, body: addTracksData });
              if (addTracksResponse.ok) {
                const jsonAddTracksResponse = await addTracksResponse.json();
                const snapshotId = jsonAddTracksResponse.snapshot_id;
              }
            }
          }
        }
        catch(error) {
          console.log(error);
        }
      }
    }

    export default Spotify;
