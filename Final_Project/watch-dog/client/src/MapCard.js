/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import './MapCard.css';
import treeJson from './trees.geojson';
// let admins = require ('./trees.geojson.json');

const myHeat = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-79.91746, 40.44356],
      },
      properties: {
        dbh: 0,
      },
    },
  ],
};

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
        // markers.forEach (marker => {
        //   marker.remove ();
        // });
        // var newMarkers = [];
        if (markers.length == 0) {
          var features = [];
          props.markers.forEach (marker => {
            // var newMarker = new mapboxgl.Marker ()
            //   .setLngLat ([marker['latitude'], marker['longitude']])
            //   .addTo (map);
            features.push ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [marker['longitude'], marker['latitude']],
              },
              properties: {
                dbh: Math.floor (Math.random () * 62 + 1),
              },
            });
            // newMarkers.push (newMarker);
          });
          setMarkers (features);
          var myGeoJSON = {
            type: 'FeatureCollection',
            features: features,
          };
          console.log ('adding data');
          console.log (myGeoJSON);
          map.addSource ('earthquakes', {
            type: 'geojson',
            data: myGeoJSON,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Ra
          });

          var layers = map.getStyle ().layers;
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol') {
              firstSymbolId = layers[i].id;
              break;
            }
          }
          initCluster (firstSymbolId);
        }
      }
    },
    [map, props.markers]
  );

  function initCluster (firstSymbolId) {
    map.addLayer (
      {
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      },
      firstSymbolId
    );

    map.addLayer (
      {
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      },
      firstSymbolId
    );

    map.addLayer (
      {
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      },
      firstSymbolId
    );
  }
  function initHeatMap (firstSymbolId) {
    console.log ('init heat map');
    map.addLayer (
      {
        id: 'trees-heat',
        type: 'heatmap',
        source: 'trees',
        maxzoom: 15,
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'dbh',
            type: 'exponential',
            stops: [[1, 0], [62, 1]],
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [[11, 1], [15, 3]],
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(236,222,239,0)',
            0.2,
            'rgb(208,209,230)',
            0.4,
            'rgb(166,189,219)',
            0.6,
            'rgb(103,169,207)',
            0.8,
            'rgb(28,144,153)',
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [[11, 15], [15, 20]],
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [[14, 1], [15, 0]],
          },
        },
      },
      firstSymbolId
    );

    map.addLayer (
      {
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
              [{zoom: 15, value: 1}, 5],
              [{zoom: 15, value: 62}, 10],
              [{zoom: 22, value: 1}, 20],
              [{zoom: 22, value: 62}, 50],
            ],
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
              [60, 'rgb(1,108,89)'],
            ],
          },
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': {
            stops: [[14, 0], [15, 1]],
          },
        },
      },
      firstSymbolId
    );

    map.on ('click', 'trees-point', function (e) {
      new mapboxgl.Popup ()
        .setLngLat (e.features[0].geometry.coordinates)
        .setHTML ('<b>DBH:</b> ' + e.features[0].properties.dbh)
        .addTo (map);
    });
  }

  useEffect (
    () => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map ({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
          center: [-79.387015, 43.651070],
          zoom: 11,
        });

        map.on ('load', () => {
          // map.resize ();
          var layers = map.getStyle ().layers;
          // console.log (layers);
          var firstSymbolId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol') {
              firstSymbolId = layers[i].id;
              break;
            }
          }

          // map.addSource ('trees', {
          //   type: 'geojson',
          //   data: myHeat,
          // });
          // new mapboxgl.Marker ().setLngLat ([-79.91746, 40.44356]).addTo (map);

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
