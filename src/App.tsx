import React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { MapC } from './components/MapC';
import RemoteServices from './services/RemoteServices';
import CenoteDTO from './models/CenoteDTO';

function App() {
  const [cenotes, setCenotes] = React.useState<CenoteDTO[] | null>(null);

  const fetching = async () => {
    let response = RemoteServices.cenotesGenerator(5);
    for await (let res of response) {
      setCenotes(res);
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
      />
    </div>
  );
}

export default App;
