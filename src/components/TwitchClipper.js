import React from 'react';
import './TwitchClipper.css';
import NavbarProj from './NavbarProj.js';
import axios from 'axios';
// import DatePicker from 'react-datepicker'

// import "react-datepicker/dist/react-datepicker.css" // CSS that allows the calendar to show up properly in datepicker

// Set the client ID
const CLIENT_ID = '2zrys8su2u1tm0yip0adcvx2s7czr2';

// TwitchClipper component that returns the search input as well as the search values
const TwitchClipper = () => {
  // State hook that handles the searchTerm
  const [searchTerm, setSearchTerm] = React.useState('');
  // State hook to handle the url of the API to grab the userId
  const [url, setUrl] = React.useState('https://api.twitch.tv/helix/users?login=')
  // Store the userId in a state hook
  const [userID, setUserID] = React.useState('');

  // clipsReducer that handles each action type and sets corresponding states, including loading and initialized screens and the clips list
  const clipsReducer = (state, action) => {
    switch (action.type) {
      case "CLIPS_FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isInit: true,
          isInvalidID: false,
          isEmpty: false,
          page: ''
        };
      case "CLIPS_FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isInvalidID: false,
          isEmpty: false,
          data: 
            action.payload.list === 0 || action.newUser // Check if current list is empty or if a new user is being loaded
              ? action.payload.list
              : state.data.concat(action.payload.list),
          page: action.payload.page
        };
      case "CLIPS_FETCH_INVALID_ID":
        return {
          ...state,
          isLoading: false,
          isInvalidID: true,
          isEmpty: false,
          data: [],
          page: ''
        }
      case "CLIPS_FETCH_EMPTY":
        return {
          ...state,
          isLoading: false,
          isInvalidID: false,
          isEmpty: true,
          data: [],
          page: ''
        }
      default: 
        throw new Error();
    }
  }

  // Reducer hook that handles the clip data
  const [clips, dispatchClips] = React.useReducer(
    clipsReducer,
    { data: [], isLoading: false, isInit: false, isInvalidID: false, isEmpty: false, page: '' }
  )
  
  // useEffect hook to handle detecting when scrolled to bottom of page
  React.useEffect(() => {
    // Function that handles adding more clips to page when scrolled to bottom
    const handleMore = async () => {
      let configClipInfo = {
        method: 'get',
        url: `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=20&after=${clips.page}`,
        headers: { 
          'client-id': CLIENT_ID, 
          'Authorization': process.env.REACT_APP_TWITCH_AUTH
        }
      }
      let responseList = await axios(configClipInfo);
      dispatchClips({ type: 'CLIPS_FETCH_SUCCESS', payload: { list: responseList.data.data, page: responseList.data.pagination.cursor } });
    }

    const onScroll = (e) => {
      // If the scroll hits the bottom, execute handleMore function
      if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight && clips.page !== undefined && clips.isInit) {
        handleMore();
      }
    }

    //Add/remove event listeners for scrolling
    document.getElementById("clipBody").addEventListener('scroll', onScroll);
    return () => document.getElementById("clipBody").removeEventListener("scroll", onScroll);
  },[userID, clips.page, clips.isInit]);


  // useEffect hook that does the work when "Submit" is clicked and the url changes
  React.useEffect(() => {
    if (url !== 'https://api.twitch.tv/helix/users?login=') {
      
      // Defines config variable to be used for retrieving user id
      let configUserId = {
          method: 'get',
          url: url,
          headers: { 
            'client-id': CLIENT_ID, 
            'Authorization': process.env.REACT_APP_TWITCH_AUTH
        }
      };

      // Asynchronous function to handle the axios calls
      const fetchData = async () => {
        dispatchClips({ type: 'CLIPS_FETCH_INIT' });
        
        // Use axios to return a JSON response with the user id based on the username entered
        const responseUserId = await axios(configUserId);
        if (responseUserId.data.data.length !== 0) {
          setUserID(responseUserId.data.data[0].id);
        } else {
          setUserID('');
        }

        // If userId is defined, then pull the list of clips
        if (userID !== '') {
          // Defines config variable to be used for retrieving clip info from user id
          let configClipInfo = {
            method: 'get',
            url: `https://api.twitch.tv/helix/clips?broadcaster_id=${userID}&first=20`,
            headers: { 
              'client-id': CLIENT_ID, 
              'Authorization': process.env.REACT_APP_TWITCH_AUTH
            }
          }
          // Use axios to return a JSON response with clip information based on the user id
          const responseList = await axios(configClipInfo);

          // setClips via reducer dispatch function to that information
          if (responseList.data.data.length === 0) { // If there are no clips associated with userID, show error message of empty list
            dispatchClips({ type: 'CLIPS_FETCH_EMPTY' });
          } else { // Else load the list, passing in a newUser parameter that checks if the user is different from the last one
            dispatchClips({ type: 'CLIPS_FETCH_SUCCESS', payload: { list: responseList.data.data, page: responseList.data.pagination.cursor }, newUser: true });
          }
          
        } else { // Else return an invalid ID error message
          dispatchClips({ type: 'CLIPS_FETCH_INVALID_ID' });
        }
      }

      fetchData();
    }
  }, [url, userID]);

  return (  
    <div className="clipBody">
      <NavbarProj />
      <div id="clipBody" className="clipContainer">
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} setUrl={setUrl} />
        {clips.isLoading ? (
          <div style={{color:'white'}}>Loading ...</div>
        ) : clips.isInvalidID ? (
          <div style={{color:'white'}}>Invalid user ID</div>
        ) : clips.isEmpty ? (
          <div style={{color:'white'}}>No clips associated with userID</div>
        ) : clips.isInit ? (
          <List clipsList={clips.data} />
        ) : <div>&nbsp;</div>
        }
      </div>
    </div>
  )
}

const SearchForm = ({ searchTerm, setSearchTerm, setUrl }) => {
  // const [startDate, setStartDate] = React.useState('');
  // const [endDate, setEndDate] = React.useState('');

  return (
    <div className="search">
      <form onSubmit={event => {setUrl(`https://api.twitch.tv/helix/users?login=${searchTerm}`); event.preventDefault();}}>
        <p>Enter a username:</p>
        <input id="search" isfocused="true" value={searchTerm} onChange={event => {
          let searchTrimmedTerm = event.target.value.trim(); // Don't allow for spaces in the search term
          setSearchTerm(searchTrimmedTerm);
          }
        } />
        {/* DatePicker tools for start-end dates if I want to go that route */}
        {/* <div style={{display: 'flex', justifyContent: 'space-between', textAlign:'center'}}>
          <div className="customDatePickerWidth">
            <p>Start Date:<br /><i>(optional)</i></p>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          </div>
          <div className="customDatePickerWidth">
            <p>End Date:<br /><i>(optional)</i></p>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          </div>
        </div> */}
        <button className="clipSubmit" type="submit" disabled={!searchTerm}>Submit</button>
      </form>
    </div>
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