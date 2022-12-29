import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import dongdaemoon from '../data/dongdaemoon.json';
import ddmgrids from '../data/ddmgrids.json';
 
export default function Map() {

 
  const onEachFeature = (feature, layer) => {
    layer.options.weight = 2;
    layer.options.dashArray = 1;
    layer.options.opacity = 1;
 
    layer.bindPopup(feature.properties.val)
    layer.on({
      mouseover: (e) => this.onMouseOver(e, feature),
      mouseout: (e) => this.onMouseOut(e, feature),
      click: (e) => this.onMouseClick(e, feature),
    })
  };
  
  const confirmedStyle = (feature) => {
      var confirmed = feature.properties.val;

      if (confirmed) {
        return {
          color: 'yellow',
          fillcolor: 'yellow', 
          fillOpacity: 0.3
        }
      } else {
        return {
          color: 'white',
          fillcolor: 'white',
          fillOpacity: 0.1
        }
      } 
  };

  return (
    <div id='map' className='w-4/5' style={{height: '800px'}}>
      <MapContainer
        center={[37.585525764712955, 127.05753783247755]} // 서울시립대
        zoom={15}
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <GeoJSON 
          data={ddmgrids} 
          onEachFeature={onEachFeature}
          style={confirmedStyle}
        />
      </MapContainer>
    </div>
  );
}
