import React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { MapC } from './components/MapC';
import RemoteServices from './services/RemoteServices';
import CenoteDTO from './models/CenoteDTO';

export interface geoJsonI {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

function App() {
  const [cenotes, setCenotes] = React.useState<CenoteDTO[] | null>(null);
  const [geoJson, setGeoJson] = React.useState<geoJsonI[]>([]);
  
  const fetching = async () => {
    let response = RemoteServices.cenotesGenerator(500);
    for await (let res of response) {
      setCenotes(res);
      const newData = [];
      for (const data of res) {
        const type = data.geojson.type;
        const coordinates = data.geojson.geometry.coordinates
        const coordinatesType = data.geojson.geometry.type
        const newObj = {
            type,
            geometry: {
              type: coordinatesType,
              coordinates
            }
          ,

        }
        newData.push(newObj);
      }
      setGeoJson(newData);
    }
  };

  React.useEffect(() => {
    fetching();
  }, []);

  //console.log({cenotes});

  return (
    <div className='map-wrap'>
      <MapC
        lng={-89.62316999999996}
        lat={20.96670000000006}
        zoom={10}
        cenotes={cenotes}
        geoJson={geoJson}
      />
    </div>
  );
}

export default App;
