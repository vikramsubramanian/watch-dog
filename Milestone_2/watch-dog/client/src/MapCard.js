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

  // useEffect (
  //   () => {
  //     if (map) {
  //       markers.forEach (marker => {
  //         marker.remove ();
  //       });
  //       var newMarkers = [];
  //       props.markers.forEach (marker => {
  //         var newMarker = new mapboxgl.Marker ()
  //           .setLngLat ([marker['latitude'], marker['longitude']])
  //           .addTo (map);
  //         // newMarkers.push (newMarker);
  //       });
  //       setMarkers (newMarkers);
  //     }
  //   },
  //   [map, props.markers]
  // );

  useEffect (
    () => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map ({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
          center: [-120, 50],
          zoom: 2,
          // minzoom: 3,
          // maxzoom: 12,
          // tolerance: 10.5,
          // buffer: 500,
        });

        map.on ('load', () => {
          // map.resize ();
          var layers = map.getStyle ().layers;
          console.log (layers);
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol') {
              firstSymbolId = layers[i].id;
              break;
            }
          }

          // map.addSource ('trees', {
          //   type: 'geojson',
          //   data: {
          //     type: 'FeatureCollection',
          //     features: [
          //       {
          //         type: 'Feature',
          //         geometry: {
          //           type: 'Point',
          //           coordinates: [-79.387015, 43.651070],
          //         },
          //         properties: {
          //           id: '3',
          //           dbh: 14,
          //         },
          //       },
          //     ],
          //   },
          // });
          map.addSource ('earthquakes', {
            type: 'geojson',
            data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          });

          map.addLayer (
            {
              id: 'earthquakes-heat',
              type: 'heatmap',
              source: 'earthquakes',
              maxzoom: 9,
              paint: {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': [
                  'interpolate',
                  ['linear'],
                  ['get', 'mag'],
                  0,
                  0,
                  6,
                  1,
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0,
                  1,
                  9,
                  3,
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0,
                  'rgba(33,102,172,0)',
                  0.2,
                  'rgb(103,169,207)',
                  0.4,
                  'rgb(209,229,240)',
                  0.6,
                  'rgb(253,219,199)',
                  0.8,
                  'rgb(239,138,98)',
                  1,
                  'rgb(178,24,43)',
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0,
                  2,
                  9,
                  20,
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  7,
                  1,
                  9,
                  0,
                ],
              },
            },
            'waterway-label'
          );

          map.addLayer({
            id: 'trees-point',
            type: 'circle',
            source: 'trees',
            minzoom: 14,
            paint: {
              // increase the radius of the circle as the zoom level and dbh value increases
              'circle-radius': {
                property: 'dbh',
                type: 'exponential',
                stops: [
                  [{ zoom: 15, value: 1 }, 5],
                  [{ zoom: 15, value: 62 }, 10],
                  [{ zoom: 22, value: 1 }, 20],
                  [{ zoom: 22, value: 62 }, 50],
                ]
              },
              'circle-color': {
                property: 'dbh',
                type: 'exponential',
                stops: [
                  [0, 'rgba(236,222,239,0)'],
                  [10, 'rgb(236,222,239)'],
                  [20, 'rgb(208,209,230)'],
                  [30, 'rgb(166,189,219)'],
                  [40, 'rgb(103,169,207)'],
                  [50, 'rgb(28,144,153)'],
                  [60, 'rgb(1,108,89)']
                ]
              },
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              'circle-opacity': {
                stops: [
                  [14, 0],
                  [15, 1]
                ]
              }
            }
          }, 'waterway-label');

          setMap (map);
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
