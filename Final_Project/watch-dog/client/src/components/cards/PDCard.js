/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';

import {Dimmer, Loader} from 'semantic-ui-react';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

import {distance} from '@turf/turf';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import './PDCard.css';

function PDCard (props) {
  /* This will let you use the .remove() function later on */
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild (this);
      }
    };
  }

  const [lng, setLng] = useState (43.691070);
  const [lat, setLat] = useState (-79.347015);
  const [zoom, setZoom] = useState (9);
  const [map, setMap] = useState (null);
  const [loadingMap, setLoadingMap] = useState (true);
  const [viewport, setViewport] = useState ({});
  const mapContainer = useRef (null);
  const [pdData, setPDData] = useState (null);

  useEffect (() => {
    console.log ('Props updated');

    console.log (props.data);

    var details = [];
    props.data.forEach ((loc, id) => {
      details.push ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: loc.coords,
        },
        properties: {
          id: id,
          phoneFormatted: '(202) 234-7336',
          phone: '2022347336',
          address: loc.rawAddress,
          name: loc.name,
          total: loc.total,
        },
      });
    });
    var data = {
      type: 'FeatureCollection',
      features: details,
    };

    setPDData (data);
  }, props.data);

  function addMarkers (map) {
    /* For each feature in the GeoJSON object above: */
    pdData.features.forEach (function (marker) {
      /* Create a div element for the marker. */
      var el = document.createElement ('div');
      /* Assign a unique `id` to the marker. */
      el.id = 'marker-' + marker.properties.id;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';

      el.addEventListener ('click', function (e) {
        /* Fly to the point */
        flyToStore (marker, map);
        /* Close all other popups and display popup for clicked store */
        createPopUp (marker, map);
        /* Highlight listing in sidebar */
        var activeItem = document.getElementsByClassName ('myActive');
        e.stopPropagation ();
        if (activeItem[0]) {
          activeItem[0].classList.remove ('myActive');
        }
        var listing = document.getElementById (
          'listing-' + marker.properties.id
        );
        listing.classList.add ('myActive');
      });

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
      **/
      new mapboxgl.Marker (el, {offset: [0, -23]})
        .setLngLat (marker.geometry.coordinates)
        .addTo (map);
    });
  }

  function setup () {
    console.log ('setting up');
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({setMap, mapContainer}) => {
      const map = new mapboxgl.Map ({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10?optimize=true',
        center: [lat, lng],
        zoom: zoom,
      });

      map.on ('load', () => {
        // map.resize ();
        map.addSource ('places', {
          type: 'geojson',
          data: pdData,
        });

        var geocoder = new MapboxGeocoder ({
          accessToken: mapboxgl.accessToken, // Set the access token
          mapboxgl: mapboxgl, // Set the mapbox-gl instance
          marker: true, // Use the geocoder's default marker style
          bbox: [-79.9576, 43.5168, -78.7244, 44.0338], // Set the bounding box coordinates
        });

        buildLocationList (pdData, map);
        map.addControl (geocoder, 'top-left');
        addMarkers (map);

        geocoder.on ('result', function (ev) {
          var searchResult = ev.result.geometry;
          var options = {units: 'miles'};
          pdData.features.forEach (function (store) {
            Object.defineProperty (store.properties, 'distance', {
              value: distance (searchResult, store.geometry, options),
              writable: true,
              enumerable: true,
              configurable: true,
            });
          });

          pdData.features.sort (function (a, b) {
            if (a.properties.distance > b.properties.distance) {
              return 1;
            }
            if (a.properties.distance < b.properties.distance) {
              return -1;
            }
            return 0; // a must be equal to b
          });

          var listings = document.getElementById ('listings');
          while (listings.firstChild) {
            listings.removeChild (listings.firstChild);
          }

          buildLocationList (pdData, map);

          var bbox = getBbox (pdData, 0, searchResult);
          map.fitBounds (bbox, {
            padding: 100,
          });

          /* Open a popup for the closest store. */
          createPopUp (pdData.features[0], map);

          /** Highlight the listing for the closest store. */
          var activeListing = document.getElementById (
            'listing-' + pdData.features[0].properties.id
          );
          activeListing.classList.add ('myActive');
        });

        setMap (map);
        setLoadingMap (false);
      });

      map.addControl (new mapboxgl.NavigationControl ());

      map.on ('move', () => {
        setLng (map.getCenter ().lng.toFixed (4));
        setLat (map.getCenter ().lat.toFixed (4));
        setZoom (map.getZoom ().toFixed (2));
      });
    };

    if (!map && pdData) {
      initializeMap ({setMap, mapContainer});
    } else if (map && pdData) {
      map.getSource ('places').setData (pdData);
      var listings = document.getElementById ('listings');
      while (listings.firstChild) {
        listings.removeChild (listings.firstChild);
      }
      buildLocationList (pdData, map);
    }
  }

  useEffect (
    () => {
      setup ();
    },
    [pdData]
  );

  function getBbox (sortedStores, storeIdentifier, searchResult) {
    var lats = [
      sortedStores.features[storeIdentifier].geometry.coordinates[1],
      searchResult.coordinates[1],
    ];
    var lons = [
      sortedStores.features[storeIdentifier].geometry.coordinates[0],
      searchResult.coordinates[0],
    ];
    var sortedLons = lons.sort (function (a, b) {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    var sortedLats = lats.sort (function (a, b) {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    return [[sortedLons[0], sortedLats[0]], [sortedLons[1], sortedLats[1]]];
  }

  function flyToStore (currentFeature, map) {
    map.flyTo ({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  }

  function createPopUp (currentFeature, map) {
    var popUps = document.getElementsByClassName ('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove ();

    var popup = new mapboxgl.Popup ({closeOnClick: false})
      .setLngLat (currentFeature.geometry.coordinates)
      .setHTML (
        '<h3>Police ' +
          currentFeature.properties.name +
          '</h3>' +
          '<h4>' +
          currentFeature.properties.address +
          '</h4>'
      )
      .addTo (map);
  }

  function buildLocationList (data, map) {
    data.features.forEach (function (store, i) {
      /**
       * Create a shortcut for `store.properties`,
       * which will be used several times below.
       **/
      var prop = store.properties;

      /* Add a new listing section to the sidebar. */
      var listings = document.getElementById ('listings');
      var listing = listings.appendChild (document.createElement ('div'));
      /* Assign a unique `id` to the listing. */
      listing.id = 'listing-' + prop.id;
      /* Assign the `item` class to each listing for styling. */
      listing.className = 'item';

      /* Add the link to the individual listing created above. */
      var link = listing.appendChild (document.createElement ('a'));
      link.href = 'javascript:void(0);';
      link.className = 'title';
      link.id = 'link-' + prop.id;
      link.innerHTML = prop.address + ' (' + prop.name + ')';

      /* Add details to the individual listing. */
      var details = listing.appendChild (document.createElement ('div'));
      details.innerHTML += 'Total Crime: ' + prop.total;
      if (prop.distance) {
        var roundedDistance = Math.round (prop.distance * 100) / 100;
        details.innerHTML +=
          '<p><strong>' + roundedDistance + ' miles away</strong></p>';
      }

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      link.addEventListener ('click', function (e) {
        for (var i = 0; i < data.features.length; i++) {
          if (this.id === 'link-' + data.features[i].properties.id) {
            var clickedListing = data.features[i];
            flyToStore (clickedListing, map);
            createPopUp (clickedListing, map);
          }
        }
        var activeItem = document.getElementsByClassName ('myActive');
        if (activeItem[0]) {
          activeItem[0].classList.remove ('myActive');
        }
        this.parentNode.classList.add ('myActive');
      });
    });
  }

  return (
    <div className="pdContainer">
      {loadingMap &&
        <Dimmer active>
          <Loader />
        </Dimmer>}
      <div class="sidebar">
        <div class="heading">
          <h1 className="locationHeader">
            Police Division Locations
          </h1>
        </div>
        <div id="listings" class="listings" />
      </div>
      <div
        id="map"
        ref={el => (mapContainer.current = el)}
        className="map pad2"
        width="100%"
        height="100%"
      >
        Map
      </div>
    </div>
  );
}

export default PDCard;
