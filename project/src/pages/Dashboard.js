import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline, LayersControl, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import LocationFinderDummy from "../components/LocationFinderDummy";

import ddmgrids from '../data/ddmgrids.json';
import seouluniv from '../data/seouluniv1010.json';
 
export default function Map() { 

  function MapComponent() {
    const map = useMapEvent('zoom', () => {
      map.setView([37.58360620664327, 127.05843925233872]);
    })
    const location = useMapEvent('click', () => {
      if (location.getZoom() == 18) {
        console.log('max zoom');
        // location.addLayer();
      }
      console.log(location.getZoom());
    })
    return null
  }


  const [data, setData] = useState(['']);

  const getClick = () => {
    // axios.get('http://localhost:5000/geometry')
    axios.get('http://59.6.99.141:7500/robot-location')
      .then(res => setData(res.data))
  }

  // grid - id popup
  // const onEachFeature = (feature, layer, e) => {
  //   layer.bindPopup('<h1 class="font-bold">'+feature.geometry.type+'</h1><p>id: '+feature.properties.id+'</p>');
  // };
  
  const confirmedStyle = (feature) => {
      // const confirmed = feature.properties.val;
      const confirmed = null;
      if (confirmed) {
        return {
          weight: 1, // stroke width (default: 3)
          color: 'yellow',
          fillcolor: 'yellow', 
          fillOpacity: 0.3
        }
      } else {
        return {
          color: 'white', // stroke color
          weight: 1, // stroke width (default: 3)
          opacity: 1, // stroke opacity (default: 1.0)
          fillcolor: 'white',
          fillOpacity: 0
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
    <div className="w-full">
      <div className="flex border-b border-l border-r border-indigo-400 border-">
        <div id='map' className='w-4/5' style={{height: '800px'}}>
          <MapContainer
            center={[37.58360620664327, 127.05843925233872]} // 서울시립대
            zoom={18} // max: 18
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <LocationFinderDummy />
            <MapComponent />
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {
              polylines.map((polyline, i) => (
                <Polyline key={i} pathOptions={lineOptions[i]} positions={polyline} />
              ) )
            }
            <LayersControl>
              <LayersControl.Overlay checked name="10m 격자">
              <GeoJSON 
                data={seouluniv} 
                // onEachFeature={onEachFeature}
                style={confirmedStyle}
              />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="100m 격자">
              <GeoJSON 
                data={ddmgrids} 
                // onEachFeature={onEachFeature}
                style={confirmedStyle}
              />
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </div>
        <div id='board' className="w-1/5 border-l-2 border-indigo-200">
          <div className="p-0 text-lg text-left border-b border-indigo-400">
          </div>
        </div>
      </div>
      <div>
        <button onClick={getClick} className="hover:text-red-600">Click</button>
      </div>
      {data.map((v,i) => 
        v.map((w, j) => {
          return (
            <div key={j} className="flex text-sm border-b border-indigo-400">
              <div className="mx-8">id = {w.id}</div>
              <div className="mr-8">times = {w.times}</div>
              <div className="mr-8">latlon = {w.lat}, {w.lon}</div>
            </div>
          )
        })
      )}
    </div>
  );
}
