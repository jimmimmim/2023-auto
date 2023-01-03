import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import ddmgrids from '../data/ddmgrids.json';
import test1 from '../data/test1.json';
import test2 from '../data/test2.json';
import test3 from '../data/test3.json';

 
export default function Map() { 

  const onEachFeature = (feature, layer) => {
    layer.options.weight = 2;
    layer.options.dashArray = 1;
    layer.options.opacity = 1;
 
    layer.bindPopup(feature.properties.val)
    layer.on({
      // mouseover: (e) => this.onMouseOver(e, feature),
      // mouseout: (e) => this.onMouseOut(e, feature),
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

  const fillBlueOptions = {
    color: 'blue',
    fillColor: 'blue',
    dashArray: 4,
  }
  const fillRedOptions = {
    color: 'red',
    fillColor: 'red',
    dashArray: 4,
  }

  const fillBlackOptions = {
    color: 'black',
    fillColor: 'black', 
    fillOpacity: 1,
    dashArray: 4,
  }

  // add polylines
  const polyline1 = [];
  for (let i = 0; i < test1.length; i++) {
    var arr = [test1[i].lat, test1[i].lon];
    polyline1.push(arr);
  }
  const polyline2 = [];
  for (let i = 0; i < test2.length; i++) {
    var arr = [test2[i].lat, test2[i].lon];
    polyline2.push(arr);
  }
  const polyline3 = [];
  for (let i = 0; i < test3.length; i++) {
    var arr = [test3[i].lat, test3[i].lon];
    polyline3.push(arr);
  }


  return (
    <div id='map' className='w-4/5' style={{height: '800px'}}>
      <MapContainer
        center={[37.58360620664327, 127.05843925233872]} // 서울시립대
        zoom={20}
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
        <Polyline pathOptions={fillBlackOptions} positions={polyline1} />
        <Polyline pathOptions={fillBlueOptions} positions={polyline2} />
        <Polyline pathOptions={fillRedOptions} positions={polyline3} />
      </MapContainer>
    </div>
  );
}
