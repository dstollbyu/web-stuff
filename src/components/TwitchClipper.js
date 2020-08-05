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

  // onSearchSubmit function that does the work when "Submit" is clicked
  const onSearchSubmit = (event) => {
    
    // Reset the clips array, please? https://overreacted.io/a-complete-guide-to-useeffect/
    setClips([]);

    // Defines config variable to be used for retrieving user id
    let configUserId = {
        method: 'get',
        url: `https://api.twitch.tv/helix/users?login=${searchTerm}`,
        headers: { 
          'client-id': '2zrys8su2u1tm0yip0adcvx2s7czr2', 
          'Authorization': process.env.REACT_APP_TWITCH_AUTH
      }
    };

    // Use axios to return a JSON response with clip information based on the user id
    axios(configUserId)
      .then((response) => {
        let userId;
        // Store the userId into a variable from the retrieved json data
        let userData = response.data.data;
        if (userData.length !== 0) userId = response.data.data[0].id;
        // If userId is defined, then pull the list of clips
        if (userId !== undefined) {
          // Defines config variable to be used for retrieving clip info from user id
          let configClipInfo = {
            method: 'get',
            url: `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=10`,
            headers: { 
              'client-id': '2zrys8su2u1tm0yip0adcvx2s7czr2', 
              'Authorization': process.env.REACT_APP_TWITCH_AUTH
            }
          }
          // Another axios call to return the actual clip information
          axios(configClipInfo)
            .then((response) => {
              const responseList = response.data.data;
              setClips([...clips, ...responseList]);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("UserID does not exist");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Prevents browser from reloading when search is submitted
    event.preventDefault();
  }

  // handleSearchInput function to set searchTerm equal to the value in the input every time it's changed; necessary for onChange to exist
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="clipBody">
      <NavbarProj />
      <div className="clipContainer">
        <form onSubmit={onSearchSubmit} className="search">
          <p>Enter a username:</p>
          <input id="search" isfocused="true" value={searchTerm} onChange={handleSearchInput} />
          <button type="submit" disabled={!searchTerm}>Submit</button>
        </form>
        <div className="clipListContainer">
          <List clipsList={clips} />
        </div>
      </div>
    </div>
  )
}

const List = ({ clipsList }) => {
  console.log(clipsList);
  return (
    <>
      {clipsList.map((item) => (<Item key={item.id} item={item} />))}
    </>
  )
}

const Item = ({ item }) => {
  return (
    <>
      <p> {item.url} - {item.title} </p>
    </>
  )
}

export default TwitchClipper;