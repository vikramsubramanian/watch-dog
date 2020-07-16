/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import './MapCard.css';

function MapCard (props) {
  const [lng, setLng] = useState (43.651070);
  const [lat, setLat] = useState (-79.387015);
  const [zoom, setZoom] = useState (10);
  const [map, setMap] = useState (null);
  const [viewport, setViewport] = useState ({});
  const [markers, setMarkers] = useState ([]);
  const mapContainer = useRef (null);

  useEffect (
    () => {
      if (map) {
        markers.forEach (marker => {
          marker.remove ();
        });
        var newMarkers = [];
        props.markers.forEach (marker => {
          var newMarker = new mapboxgl.Marker ()
            .setLngLat ([marker['latitude'], marker['longitude']])
            .addTo (map);

          map.addSource ('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  // feature for Mapbox DC
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [marker['latitude'], marker['longitude']],
                  },
                  properties: {
                    title: 'Mapbox DC',
                  },
                },
              ],
            },
          });
          // newMarkers.push (newMarker);
        });
        setMarkers (newMarkers);
      }
    },
    [map, props.markers]
  );

  useEffect (
    () => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map ({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // stylesheet location
          center: [lat, lng],
          zoom: zoom,
          minzoom: 3,
          maxzoom: 12,
          tolerance: 10.5,
          buffer: 500,
        });

        map.on ('load', () => {
          setMap (map);
          map.resize ();
        });

        map.addControl (new mapboxgl.NavigationControl ());

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
    <div style={{height: '300px'}}>
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
