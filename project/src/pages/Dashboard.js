import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';


import ddmgrids from '../data/ddmgrids.json';
import test from '../data/test.json';
 
export default function Map() { 

  const [data, setData] = useState(['']);

  const getClick = () => {
    // axios.get('http://localhost:5000/geometry')
    axios.get('http://59.6.99.141:7500/robot-location')
      .then(res => setData(res.data))
  }

  // const postClick = () => {
  //   axios.post('https://jsonplaceholder.typicode.com/todos',{
  //     id :"81470D5A-BFC6-4F2D-AF62-E134CA9963C72023/01/02 11:27:17",
  //     lat:37.5848959,
  //     lon:127.0604424,
  //     times:"2023/01/02 11:27:17",
  //     seq:1
  //   })
  //     .then(res => console.log(res.data))
  // }

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
  const fillGreenOptions = {
    color: 'green',
    fillColor: 'green',
    dashArray: 4,
  }
  const fillPurpleOptions = {
    color: 'purple',
    fillColor: 'purple',
    dashArray: 4,
  }
  const fillBlackOptions = {
    color: 'black',
    fillColor: 'black', 
    fillOpacity: 1,
    dashArray: 4,
  }

  // add polylines from server
  const polyline0 = [];

  // 잘못된 데이터 삭제 (수정시간 짧은 것)
  for (let i = 0; i < data.length; i++) {
    if (data[i].length < 100) {
      data.splice(i, 1);
      i--;
    } else {
      for (let j = 0; j < data[i].length; j++) {
        var arr = [data[i][j].lat, data[i][j].lon];
        polyline0.push(arr);
      }
    }
  }

  // add polylines from local file
  const polyline1 = [];
  const polyline2 = [];
  const polyline3 = [];
  for (let i = 0; i < test.length; i++) {
    if (test[i].id.startsWith("81470D5A")) {
      var arr = [test[i].lat, test[i].lon];
      polyline1.push(arr);
    } else if (test[i].id.startsWith("30FB9002")) {
      var arr = [test[i].lat, test[i].lon];
      polyline2.push(arr);
    } else if (test[i].id.startsWith("2D830BE8")) {
      var arr = [test[i].lat, test[i].lon];
      polyline3.push(arr);
    }
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
        {/* <Polyline pathOptions={fillRedOptions} positions={polyline1} />
        <Polyline pathOptions={fillGreenOptions} positions={polyline2} />
        <Polyline pathOptions={fillPurpleOptions} positions={polyline3} /> */}
        <Polyline pathOptions={fillBlackOptions} positions={polyline0} />
      </MapContainer>
      <div>
        <button onClick={getClick}>Click</button>
        {/* <button onClick={postClick}>Post</button> */}
      </div>
      {data.map((v,i) => {
        return (
          <div key={i} className="flex border border-red-400">
            <h3 className="font-bold mr-10">{v.title}</h3>
            <div className="mr-8">id = {v.id}</div>
            <div className="mr-8">times = {v.times}</div>
            <div className="mr-8">latlon = {v.lat}, {v.lon}</div>
          </div>
        )
      })}
    </div>
  );
}
