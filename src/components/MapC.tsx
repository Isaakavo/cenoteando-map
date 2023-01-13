import { Point } from 'geojson';
import maplibreGl, { GeoJSONSource, LngLatLike, Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React from 'react';
import { geoJsonI } from '../App';
import '../map.css';
import CenoteDTO from '../models/CenoteDTO';
import { layers, mapLayers } from '../utils/tiles';
import { MapLayerSelector } from './MapLayerSelector';

interface MapCI {
  lng: number;
  lat: number;
  zoom: number;
  cenotes?: CenoteDTO[] | CenoteDTO| null;
  geoJson: geoJsonI[];
}

export const MapC: React.FC<MapCI> = (props) => {
  let { cenotes, geoJson } = props;

  debugger;
  const mapContainer = React.useRef(null);
  const map = React.useRef<Map | null>(null);

  const [lng] = React.useState(-89.62316999999996);
  const [lat] = React.useState(20.96670000000006);
  const [zoom] = React.useState(props.zoom);
  const [API_KEY] = React.useState('2ovqIDOtsFG069J69Ap2');
  // const [cenotesCoor, setCenotesCoor] = React.useState<[number, number][]>([]);
  const [cenotesLayers, setCenotesLayers] = React.useState('');

  const onSelectedOptionCallback = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCenotesLayers(e.target.value);
    map.current?.setStyle(mapLayers(e.target.value));
  };

  React.useEffect(() => {
    if (map.current) {
      debugger;
      map.current.on('load', () => {
        console.log('load');
        
        if (geoJson.length > 0) {
          const sourceData = map.current?.getSource('cenotes');
          if (!sourceData) {
            map.current?.addSource('cenotes', {
              type: 'geojson',
              // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
              // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
              data: {
                type: 'FeatureCollection',
                features: geoJson,
              },
              cluster: true,
              clusterMaxZoom: 14, // Max zoom to cluster points on
              clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
            });

            map.current?.addLayer({
              id: 'clusters',
              type: 'circle',
              source: 'cenotes',
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
            });

            map.current?.addLayer({
              id: 'cluster-count',
              type: 'symbol',
              source: 'cenotes',
              filter: ['has', 'point_count'],
              layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12,
              },
            });

            map.current?.addLayer({
              id: 'unclustered-point',
              type: 'circle',
              source: 'cenotes',
              filter: ['!', ['has', 'point_count']],
              paint: {
                'circle-color': '#12730d',
                'circle-radius': 10,
                'circle-stroke-width': 5,
                'circle-stroke-color': '#fff',
              },
            });
          }
        }
      });

      map.current.on('click', 'clusters', (e) => {
        debugger;
        const features = map.current?.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        })[0];
        if (features !== undefined) {
          const clusterId = features.properties['cluster_id'];

          if (!clusterId) return;

          (
            map.current?.getSource('cenotes') as GeoJSONSource
          ).getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            if (map.current) {
              map.current.easeTo({
                center: (features.geometry as Point).coordinates as LngLatLike,
                zoom: zoom ? zoom : undefined,
              });
            }
          });
        }
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.current.on('click', 'unclustered-point', (e) => {
        debugger;
        if (e.features !== undefined) {
          const coordinates = (
            e.features[0].geometry as Point
          ).coordinates.slice();
          const mag = e.features[0]?.properties?.mag;
          const tsunami =
            e.features[0]?.properties?.tsunami === 1 ? 'yes' : 'no';
          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
        }
      });

      map.current.on('mouseenter', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';
        }
      });

      map.current.on('mouseleave', 'clusters', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
        }
      });
      return; //stops map from intializing more than once
    }
    // Instantiation of the map
    map.current = new maplibreGl.Map({
      container: mapContainer.current ? mapContainer.current : '',
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    let nav = new maplibreGl.NavigationControl({});
    map.current.addControl(nav, 'bottom-right');

  }, [API_KEY, geoJson, lat, lng, zoom]);

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
      <MapLayerSelector options={layers} selector={onSelectedOptionCallback} />
    </div>
  );
};
