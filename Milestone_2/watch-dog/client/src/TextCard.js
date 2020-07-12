/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

function TextCard (props) {
  return (
    <div className="textCard">
      <h3>The fine print:</h3>
      <p>
        {props.data}
      </p>
    </div>
  );
}

export default TextCard;
