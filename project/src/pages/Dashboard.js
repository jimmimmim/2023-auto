import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';


import seouluniv from '../data/seouluniv1010.json';
 
export default function Map() { 

  const [data, setData] = useState(['']);

  const getClick = () => {
    // axios.get('http://localhost:5000/geometry')
    axios.get('http://59.6.99.141:7500/robot-location')
      .then(res => setData(res.data))
  }

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

  const lineOptions = [
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, }, 
    {color: 'green', fillColor: 'green', dashArray: 4, }, 
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
    {color: 'black', fillColor: 'black', dashArray: 4, },
  ];

  // add polylines from server
  const polylines = [];

  // 잘못된 데이터 삭제
  for (let i = 0; i < data.length; i++) {
    let temp = [];
    if (data[i].length < 100) {
      data.splice(i, 1);
      i--;
    } else {
      for (let j = 0; j < data[i].length; j++) {
        const arr = [data[i][j].lat, data[i][j].lon];
        temp.push(arr);
      }
      polylines[i] = temp;
    }
  }

  console.log(polylines)

  // Create a polygon geometry
  const polygon = {
    type: "polygon",
    rings: [
      [ 127.073779734746495, 37.563878480449048 ],
      [ 127.073892920764166, 37.563878409662991 ],
      [ 127.073892831772426, 37.563788310101877 ],
      [ 127.073779645891051, 37.563788380887722 ],
      [ 127.073779734746495, 37.563878480449048 ]
    ],
    spatialReference: {
        wkid: 102100
    }
  };

  // add polylines from local file
  // const polyline1 = [];
  // const polyline2 = [];
  // const polyline3 = [];
  // for (let i = 0; i < test.length; i++) {
  //   if (test[i].id.startsWith("81470D5A")) {
  //     var arr = [test[i].lat, test[i].lon];
  //     polyline1.push(arr);
  //   } else if (test[i].id.startsWith("30FB9002")) {
  //     var arr = [test[i].lat, test[i].lon];
  //     polyline2.push(arr);
  //   } else if (test[i].id.startsWith("2D830BE8")) {
  //     var arr = [test[i].lat, test[i].lon];
  //     polyline3.push(arr);
  //   }
  // }

  return (
    <>
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
          data={seouluniv} 
          onEachFeature={onEachFeature}
          style={confirmedStyle}
        />
        {
          polylines.map((polyline, i) => (
            <Polyline key={i} pathOptions={lineOptions[i]} positions={polyline} />
          ) )
        }
      </MapContainer>
      </div>
      <div>
        <button onClick={getClick} className="hover:text-red-600">Click</button>
      </div>
      {data.map((v,i) => 
        v.map((w, j) => {
          return (
            <div key={j} className="flex border border-red-400">
              <div className="mx-8">id = {w.id}</div>
              <div className="mr-8">times = {w.times}</div>
              <div className="mr-8">latlon = {w.lat}, {w.lon}</div>
            </div>
          )
        })
      )}
      </>
  );
}
