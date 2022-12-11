import { LayerSpecification } from "maplibre-gl";

export const tileProviders: LayerSpecification[] = [
  {
    id: 'OpenStreetMap',
    source: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    type: 'fill',
    'source-layer': 'water',
    paint: {
      'fill-color': '#00ffff',
    },
    // options: {
    //   maxZoom: 19,
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // },
  },
  // {
  //   id: 'Detail',
  //   visible: false,
  //   source: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
  //   options: {
  //     maxZoom: 20,
  //     attribution:
  //       '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   },
  // },
  // {
  //   id: 'Satellite',
  //   visible: false,
  //   source: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  //   options: {
  //     attribution:
  //       'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  //   },
  // },
  // {
  //   id: 'Topographic',
  //   visible: false,
  //   source: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  //   options: {
  //     maxZoom: 17,
  //     attribution:
  //       'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  //   },
  // },
  /* TODO: Needs api key
  {
      id: 'Transport',
      visible: false,
      source: 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=' + thunderforestApiKey,
      options: {
          apikey: '<your apikey>',
        maxZoom: 22,
          attribution:
              '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
  },
  */
  // {
  //   id: 'Hike & Bike',
  //   visible: false,
  //   source: 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
  //   options: {
  //     maxZoom: 19,
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   },
  // },
  // {
  //   id: 'Nat Geo',
  //   visible: false,
  //   source: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
  //   options: {
  //     maxZoom: 16,
  //     attribution:
  //       'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
  //   },
  // },
  // {
  //   id: 'Dark',
  //   visible: false,
  //   source: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  //   options: {
  //     subdomains: 'abcd',
  //     maxZoom: 19,
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  //   },
  // },
];
