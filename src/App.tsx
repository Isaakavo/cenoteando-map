import React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { MapC } from './components/MapC';
import CenoteDTO from './models/CenoteDTO';
import { useApi } from './hooks/useApi';
import { SingUp } from './components/Signup';
import { Login } from './components/Login';

export interface geoJsonI {
  id: number | string;
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

function App() {
  const [cenotes, setCenotes] = React.useState<CenoteDTO[] | null>(null);
  const {data, loading, error} = useApi('api/cenotes', 'get', {}, {size: 150});
  
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

  console.log(error);
  
  return (
    <div className='map-wrap'>
      <MapC
        lng={-88.793250}
        lat={20.882081}
        zoom={7}
        cenotes={cenotes}
      />
      <SingUp />
      <Login />
    </div>
  );
}

export default App;
