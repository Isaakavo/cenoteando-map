import maplibreGl, { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React from 'react';
import '../map.css';
import CenoteDTO from '../models/CenoteDTO';
import { layers, mapLayers } from '../utils/tiles';
import { MapLayerSelector } from './MapLayerSelector';

interface MapCI {
  lng: number;
  lat: number;
  zoom: number;
  cenotes?: CenoteDTO[] | null;
}

export const MapC: React.FC<MapCI> = (props) => {
  let { cenotes } = props;

  const mapContainer = React.useRef(null);
  const map = React.useRef<Map | null>(null);

  const [lng] = React.useState(-89.62316999999996);
  const [lat] = React.useState(20.96670000000006);
  const [zoom] = React.useState(props.zoom);
  const [API_KEY] = React.useState('2ovqIDOtsFG069J69Ap2');

  const onSelectedOptionCallback = (e: React.ChangeEvent<HTMLSelectElement>) => {
    map.current?.setStyle(mapLayers(e.target.value));
  }

  React.useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibreGl.Map({
      container: mapContainer.current ? mapContainer.current : '',
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    let nav = new maplibreGl.NavigationControl({});
    map.current.addControl(nav, 'bottom-right');
  }, [zoom]);

  React.useEffect(() => {
    cenotes?.forEach((elem) => {
      debugger;
      if (map.current !== null) {
        new maplibreGl.Marker({ color: '#1b691b' })
          .setLngLat(elem.geojson.geometry.coordinates)
          .addTo(map.current);
      }
    });
  }, [cenotes]);

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
      <MapLayerSelector options={layers} selector={onSelectedOptionCallback} />
    </div>
  );
};
