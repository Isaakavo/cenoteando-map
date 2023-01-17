import React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { MapC } from './components/MapC';
import CenoteDTO from './models/CenoteDTO';
import { useApi } from './hooks/useApi';

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
  const { data, loading, error, fetch } = useApi(
    'api/cenotes',
    'get',
    {},
    { size: 2500 }
  );

  // TODO investigate bug that doesnt return all the cenotes if I have the JWT in the request
  React.useEffect(() => {
    if (data !== null) {
      const cenotesMap = data.content.map(
        (cenote: CenoteDTO) => new CenoteDTO(cenote)
      );
      setCenotes(cenotesMap);
    }
  }, [data]);

  React.useEffect(() => {
    fetch();
  }, []);

  if (loading && !data) {
    return <h1>Cargando...</h1>;
  }

  console.log(error);

  return (
    <div className='map-wrap'>
      <MapC lng={-88.79325} lat={20.882081} zoom={7} cenotes={cenotes} />
    </div>
  );
}

export default App;
