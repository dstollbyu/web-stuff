import React from 'react';
import './TwitchClipper.css';
import NavbarProj from './NavbarProj.js';
import axios from 'axios';

// TwitchClipper component that returns the search input as well as the search values
const TwitchClipper = () => {
  // State hook that handles the searchTerm
  const [searchTerm, setSearchTerm] = React.useState('');
  // State hook to hold the list of clips
  const [clips, setClips] = React.useState([]);
  // State hook to handle the url of the API to grab the userId
  const [url, setUrl] = React.useState('https://api.twitch.tv/helix/users?login=')
  // State hook to handle loading screen and initial screen (appears blank if hasn't been initialized)
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInit, setIsInit] = React.useState(false);

  const clientID = '2zrys8su2u1tm0yip0adcvx2s7czr2';
  const authToken = process.env.REACT_APP_TWITCH_AUTH;

  // useEffect hook that does the work when "Submit" is clicked and the url changes
  React.useEffect(() => {
    if (url !== 'https://api.twitch.tv/helix/users?login=') {
      // Defines config variable to be used for retrieving user id
      let configUserId = {
          method: 'get',
          url: url,
          headers: { 
            'client-id': clientID, 
            'Authorization': authToken
        }
      };

      // Asynchronous function to handle the axios calls
      const fetchData = async () => {
        setIsInit(true);
        setIsLoading(true);
        setClips([]);
        let userId;
        // Use axios to return a JSON response with the user id based on the username entered
        const responseUserId = await axios(configUserId);
        if (responseUserId.data.data.length !== 0) userId = responseUserId.data.data[0].id;

        // Full list of clips array
        let fullList = [];

        // If userId is defined, then pull the list of clips
        if (userId !== undefined) {
          // Defines config variable to be used for retrieving clip info from user id
          let configClipInfo = {
            method: 'get',
            url: `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=10`,
            headers: { 
              'client-id': clientID, 
              'Authorization': authToken
            }
          }
          // Use axios to return a JSON response with clip information based on the user id
          const responseList = await axios(configClipInfo);
          // Append the responseList to the fullList
          fullList = [...fullList, ...responseList.data.data];
          let pagination = responseList.data.pagination.cursor;
          // Define variables to be used outside of loop
          let configClipInfoAdded, responseListAdded;
          // Loop to get another 5 sets
          for (let i = 0; i < 5; i++) {
            // If there are no more pages, break the loop
            if (pagination === undefined) break;
            // Defines the next config variable to be used for retrieving clip info from user id
            configClipInfoAdded = {
              method: 'get',
              url: `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=100&after=${pagination}`,
              headers: { 
                'client-id': '2zrys8su2u1tm0yip0adcvx2s7czr2', 
                'Authorization': process.env.REACT_APP_TWITCH_AUTH
              }
            }
            responseListAdded = await axios(configClipInfoAdded);
            fullList = [...fullList, ...responseListAdded.data.data];
            pagination = responseListAdded.data.pagination.cursor;
          }
          // CHECKPOINT - work on retrieving game title to put alongside clip tomorrow, possibly import list for own records of games and retrieve from that? 

          // setClips to that information
          setClips(fullList);
          setIsLoading(false);
        }
      }
      console.log(process.env.REACT_APP_TEST_ENV);
      console.log(process.env.REACT_APP_TWITCH_AUTH);

      fetchData();
    }
  }, [url]);
  return (
    
    <div className="clipBody">
      <NavbarProj />
      <div className="clipContainer">
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} setUrl={setUrl} />
        {isLoading ? (
          <div style={{color:'white'}}>Loading ...</div>
        ) : isInit ? (
          <List clipsList={clips} />
        ) : <div>&nbsp;</div>
        }
      </div>
    </div>
  )
}

const SearchForm = ({ searchTerm, setSearchTerm, setUrl }) => {
  return (
    <form onSubmit={event => {setUrl(`https://api.twitch.tv/helix/users?login=${searchTerm}`); event.preventDefault();}} className="search">
      <p>Enter a username:</p>
      <input id="search" isfocused="true" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      <button type="submit" disabled={!searchTerm}>Submit</button>
    </form>
  );
};

// List component that holds the Twitch clips list
const List = ({ clipsList }) => {
  return (
    <div className="clipListContainer">
      {/* Table header */}
      <div style={{display: 'flex', fontWeight:'bold'}}>
        <span style={{width: '10%'}}>&nbsp;</span>
        <span style={{width: '40%', textAlign: 'center'}}>Clip Title</span>
        <span style={{width: '20%', textAlign: 'right'}}>Streamer</span>
        <span style={{width: '20%', textAlign: 'right'}}>Clipper</span>
        <span style={{width: '20%', textAlign: 'right'}}>View Count</span>
      </div>
      {/* Table items */}
      {clipsList.map((item) => (<Item key={item.id} item={item} />))}
    </div>
  )
}

// Item component that renders the properties of each clip
const Item = ({ item }) => {
  return (
    <>
      <a href={item.url} target="_blank" rel="noreferrer noopener">
        <div className="twitchClipItem">
          <span style={{width: '10%'}}><img className="twitchThumbnail" src={item.thumbnail_url} alt="" /> </span>
          <span style={{width: '40%'}}>{item.title}</span>
          <span style={{width: '20%', textAlign:'center'}}>{item.broadcaster_name}</span>
          <span style={{width: '20%', textAlign:'center'}}>{item.creator_name}</span>
          <span style={{width: '10%'}}>{item.view_count}</span>
        </div>
      </a>
    </>
  )
}

export default TwitchClipper;