/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Button} from 'semantic-ui-react';

import './WelcomeCard.css';

function WelcomeCard (props) {
  return (
    <div>
      <div className="infoHeader">
        <h2 className="newHere">New here?</h2>
        <p className="welcomeMsg">
          Welcome to the Watch Dog Crime Data Application
        </p>
      </div>
      <p className="detail">
        <strong>How to use:</strong>
        {' '}
        The sentence at the top filters the information
        in the cards below by crime type, indicator, date and location.
        By default, it is set to show all crimes citywide (Toronto) that happened in 2019.
        But you can click any of the underlined phrases in it to change it.
        Click OK and your new search will update the cards below,
        displaying charts and graphs that summarize the search results.
      </p>
      <Button
        basic
        color="teal"
        className="closeButton"
        onClick={props.closeWelcome}
      >
        Close
      </Button>
    </div>
  );
}

export default WelcomeCard;
