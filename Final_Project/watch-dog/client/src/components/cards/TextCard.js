/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import './TextCard.css';

function TextCard (props) {
  return (
    <div className="textCard" style={{height: props.height}}>
      <h3>{props.header}</h3>
      <p>
        {props.body}
      </p>
    </div>
  );
}

export default TextCard;
