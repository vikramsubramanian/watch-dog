/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import {Dimmer, Loader} from 'semantic-ui-react';

import './MapCard.css';

function MapCard (props) {
  const [lng, setLng] = useState (43.691070);
  const [lat, setLat] = useState (-79.347015);
  const [zoom, setZoom] = useState (9);
  const [map, setMap] = useState (null);
  const [viewport, setViewport] = useState ({});
  const [markers, setMarkers] = useState ([]);
  const mapContainer = useRef (null);
  const [loadingMap, setLoadingMap] = useState (true);

  useEffect (
    () => {
      if (map) {
        var features = [];
        props.markers.forEach (marker => {
          features.push ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [marker['longitude'], marker['latitude']],
            },
            properties: {
              name: marker['name'],
              MCI: marker['MCI'],
            },
          });
        });
        setMarkers (features);

        var myGeoJSON = {
          type: 'FeatureCollection',
          features: features,
        };
        // console.log (myGeoJSON);
        // console.log (map.getSource ('earthquakes'));
        if (!map.getSource ('earthquakes')) {
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
        } else {
          map.getSource ('earthquakes').setData (myGeoJSON);
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

    // inspect a cluster on click
    map.on ('click', 'clusters', function (e) {
      var features = map.queryRenderedFeatures (e.point, {
        layers: ['clusters'],
      });
      var clusterId = features[0].properties.cluster_id;
      map
        .getSource ('earthquakes')
        .getClusterExpansionZoom (clusterId, function (err, zoom) {
          if (err) return;

          map.easeTo ({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on ('click', 'unclustered-point', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice ();
      var name = e.features[0].properties.name;
      var MCI = e.features[0].properties.MCI;

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs (e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup ()
        .setLngLat (coordinates)
        .setHTML ('<p>Neighbourhood: ' + name + '</p><p>MCI: ' + MCI + '</p>')
        .addTo (map);
    });

    map.on ('mouseenter', 'clusters', function () {
      map.getCanvas ().style.cursor = 'pointer';
    });
    map.on ('mouseleave', 'clusters', function () {
      map.getCanvas ().style.cursor = '';
    });
  }

  useEffect (
    () => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
      const initializeMap = ({setMap, mapContainer}) => {
        const map = new mapboxgl.Map ({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v10?optimize=true', // stylesheet location
          center: [lat, lng],
          zoom: zoom,
        });

        map.on ('load', () => {
          // map.resize ();

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

      if (!map) initializeMap ({setMap, mapContainer});
    },
    [lat, lng, map, zoom]
  );

  return (
    <div style={{height: '300px'}}>
      {loadingMap &&
        <Dimmer active>
          <Loader />
        </Dimmer>}
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
