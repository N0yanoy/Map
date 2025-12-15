import {Map} from '@vis.gl/react-maplibre';
import { MAP_LATITUDE, MAP_LONGITUDE, MAP_ZOOM } from '../../common/constants';

export const CostumMap = () => {

  return (
    <Map
      initialViewState={{
        longitude: MAP_LONGITUDE,
        latitude: MAP_LATITUDE, 
        zoom: MAP_ZOOM
      }}
      style={{width: "100%", height: "100%"}}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    />
  );
};