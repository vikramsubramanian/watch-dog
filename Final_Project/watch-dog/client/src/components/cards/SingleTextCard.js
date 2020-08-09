/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import './SingleTextCard.css';

function SingleTextCard (props) {
  return (
    <div className="singleTextWrapper">
      <h1 className="singleMainText">{props.mainText}</h1>
      <h2 className="singleSubText">{props.subText}</h2>
    </div>
  );
}

export default SingleTextCard;
