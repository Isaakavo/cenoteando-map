import React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { MapC } from './components/MapC';
import CenoteDTO from './models/CenoteDTO';
import { useApi } from './hooks/useApi';
import { SingUp } from './components/Signup';

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
  const {data, loading, error} = useApi('api/cenotes', 'get', {}, {size: 100});
  
  React.useEffect(() => {
    if (data !== null) {
      const cenotesMap = data.content.map((cenote: CenoteDTO) => new CenoteDTO(cenote));
      setCenotes(cenotesMap);
    }
  }, [data])

  if (loading) {
    return (
      <h1>Cargando...</h1>
    )
  }
  
  return (
    <div className='map-wrap'>
      <MapC
        lng={-88.793250}
        lat={20.882081}
        zoom={7}
        cenotes={cenotes}
      />
      <SingUp />
    </div>
  );
}

export default App;
