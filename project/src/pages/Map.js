import React, { useState } from "react";
import { 
  MapContainer, 
  TileLayer, 
  GeoJSON, 
  Polyline, 
  LayersControl, 
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import LocationFinderDummy from "../components/LocationFinderDummy";
import Legend from "../components/Legend";
import GridStyle from "../components/GridStyle";

import ddmgrids from '../data/ddmgrids.json';
import seouluniv from '../data/seouluniv1010.json';
 
export default function Map() { 

  function MapComponent() {
    const map = useMapEvent('zoom', () => {
      map.setView([37.58360620664327, 127.05843925233872]);
    })
    const location = useMapEvent('click', () => {
      if (location.getZoom() === 18) {
        console.log('max zoom');
      }
      console.log('current zoomlevel: ', location.getZoom());
    })
    return null
  }

  const [data, setData] = useState(['']);

  const getClick = () => {
    // axios.get('http://localhost:5000/geometry')
    axios.get('http://59.6.99.141:7500/robot-location')
      .then(res => setData(res.data))
  }

  // 차량별로 지나가는 격자 아이디 배열 생성 (중복제거 완료)
  const robots = [
    [177843, 178370, 178897, 179424, 175736, 176263, 176790, 177317, 177844, 178371, 178898, 179425, 175210, 175737, 175738], // robot 0
    [179425, 178898, 178371, 177844, 177317, 176790, 176263, 175736, 175737, 175738], // robot 1
    [179425, 178898, 178899, 178372, 177845, 177318, 1176791, 176264, 175736, 175209, 175210, 175211] // robot 2
  ];

  // 격자별 지나가는 선 개수 담을 딕셔너리
  let values = {};

  // (1) 아이디별 value 저장 - total
  for (let i = 0; i < robots.length; i++) {
      for (let j = 0; j < robots[i][j]; j++) {
          if (!values[robots[i][j]]) values[robots[i][j]] = 0;
          values[robots[i][j]]++;
      }
  }

  // (2) 특정 차량에 대해서만 아이디별 value 저장
  // 예) 0번, 2번 차량 선택
  // 체크박스로 차량 선택 후 해당 인덱스를 checkedCars 배열로 전달한다고 가정

  values = {}; // 함수 안에 들어가면 const로 바꾸기
  console.log(values);

  const checkedCars = [0, 1, 2];

  for (let i = 0; i < checkedCars.length; i++) {

      for (let j = 0; j < robots[checkedCars[i]][j]; j++) {
          if (!values[robots[checkedCars[i]][j]]) {
            values[robots[checkedCars[i]][j]] = 0;
          }
          values[robots[checkedCars[i]][j]]++;
      }
  }

  const gridStyle = (feature) => {
    const confirmed = values[feature.properties.id];

    if (!confirmed) {
        return {
        color: 'white', // stroke color
        weight: 1, // stroke width (default: 3)
        opacity: 1, // stroke opacity (default: 1.0)
        fillcolor: 'white',
        fillOpacity: 0.4
        }
    } else if (confirmed === 1) {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 0.2
        }
    } else if (confirmed === 2) {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 0.4
        }
    } else if (confirmed === 3) {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 0.6
        }
    }
  }

  // grid - id popup
  const onEachFeature = (feature, layer, e) => {
    let crosspoint = 0;
    let gid;

    if (values[feature.properties.id] !== undefined){
      crosspoint = values[feature.properties.id];
    }
    if (feature.properties.gid) {
      gid = feature.properties.gid;
    } else if (feature.properties.id) {
      gid = feature.properties.id;
    }
    layer.bindPopup(
      '<div>gid: '+gid+'</div>'+
      '<div>'+feature.geometry.coordinates[0][0][0]+'</div>'+
      '<div>'+feature.geometry.coordinates[0][0][1]+'</div>'+
      '<div>'+feature.geometry.coordinates[0][0][2]+'</div>'+
      '<div>'+feature.geometry.coordinates[0][0][3]+'</div>'+
      '<div>통행 차량 수: '+crosspoint+'</div>'
    );
  };

  const lineOptions = [
    {color: 'black', fillColor: 'black', dashArray: 4, },
    {color: 'black', fillColor: 'black', dashArray: 4, },
    {color: 'black', fillColor: 'black', dashArray: 4, },
    {color: 'black', fillColor: 'black', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, }, 
    {color: 'green', fillColor: 'green', dashArray: 4, }, 
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
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

  return (
    <div className="w-full">
      <div className="flex border-b border-l border-r border-indigo-400 border-">
        <div id='map' className='w-2/3' style={{height: '800px'}}>
          <MapContainer
            center={[37.58360620664327, 127.05843925233872]} // 서울시립대
            zoom={18} // max: 18
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%"}}
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
              <LayersControl.Overlay name="10m 격자">
                <GeoJSON 
                  data={seouluniv} 
                  onEachFeature={onEachFeature}
                  style={gridStyle}
                />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="100m 격자">
                <GeoJSON 
                  data={ddmgrids} 
                  onEachFeature={onEachFeature}
                  style={gridStyle}
                />
              </LayersControl.Overlay>
            </LayersControl>
            <Legend position="bottomright" />
          </MapContainer>
        </div>
        <div id='board' className="w-1/3 border-l-2 border-white-200" style={{backgroundColor: '#07111E'}}>
          <div className="p-0 text-lg text-left border-b border-white-400">
          </div>
        </div>
      </div>
      <div>
        <button onClick={getClick} className="hover:text-blue-600">Click</button>
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
