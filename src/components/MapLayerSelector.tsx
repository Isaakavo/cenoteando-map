import React from 'react';
import '../styles/mapLayerSelector.css';

interface MapLayerSelectorI {
  options: string[];
  selector: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MapLayerSelector: React.FC<MapLayerSelectorI> = ({ options, selector }) => {
  return (
    <div className='basemaps-wrapper'>
      <select className='basemaps' onChange={selector}>
        {options.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    </div>
  );
};
