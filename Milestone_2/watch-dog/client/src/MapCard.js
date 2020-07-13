import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import './MapCard.css';

function MapCard (props) {
  const [lng, setLng] = useState (40.72);
  const [lat, setLat] = useState (-73.9773608);
  const [zoom, setZoom] = useState (11);
  const [map, setMap] = useState (null);
  const [viewport, setViewport] = useState ({});
  const mapContainer = useRef (null);

  useEffect (
    () => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map ({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: [lat, lng],
          zoom: zoom,
        });

        map.on ('load', () => {
          setMap (map);
          map.resize ();
        });

        map.on ('move', () => {
          setLng (map.getCenter ().lng.toFixed (4));
          setLat (map.getCenter ().lat.toFixed (4));
          setZoom (map.getZoom ().toFixed (2));
        });
      };

      if (!map) initializeMap ({setMap, mapContainer});
    },
    [lat, lng, map, zoom]
  );

  return (
    <div>
      <div
        {...viewport}
        ref={el => (mapContainer.current = el)}
        width="100%"
        height="100%"
        className="mapCard"
        onViewportChange={viewport => setViewport (viewport)}
      />
    </div>
  );
}

export default MapCard;
