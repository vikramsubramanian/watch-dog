/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import {toast} from 'react-semantic-toasts';

function strEqual (str1, str2) {
  return str1.localeCompare (str2) === 0;
}

function successToast (message = 'Fetched data!') {
  toast (
    {
      title: 'Success',
      description: <p>{message}</p>,
      type: 'success',
      time: 2500,
      animation: 'fade left',
    },
    () => console.log ('toast closed'),
    () => console.log ('toast clicked'),
    () => console.log ('toast dismissed')
  );
}

function errorToast (message = 'Could not connect to DB.') {
  toast (
    {
      title: 'Error',
      description: <p>{message}</p>,
      type: 'error',
      time: 2500,
      animation: 'fade left',
    },
    () => console.log ('toast closed'),
    () => console.log ('toast clicked'),
    () => console.log ('toast dismissed')
  );
}

export {strEqual, successToast, errorToast};
