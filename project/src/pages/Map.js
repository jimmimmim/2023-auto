import React, { useState, useEffect } from "react";
import { 
  MapContainer, 
  TileLayer,
  SVGOverlay,
  GeoJSON, 
  Polyline,
  CircleMarker, 
  LayersControl,
  LayerGroup,
  useMapEvent,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import LocationFinder from "../components/LocationFinder";
import MapZoomComponent from '../components/MapZoomComponent';
import Legend from "../components/Legend";

import PathContainer from "../components/PathContainer";
import Dashboard from "../components/Dashboard";

import ddmgrids from '../data/ddmgrids.json'; // 100m grid
// import seouluniv_10m from '../data/seouluniv10104326.json'; // 10m grid
import seouluniv_10m from '../data/polygon10m_0112.json'; // 10m grid
// import seouluniv_polygon from '../data/seouluniv1mpolygon.json'; // 1m grid - polygon
import seouluniv_polygon from '../data/polygon1m_0112.json'; // 1m grid - polygon
import seouluniv_robot from '../data/seouluniv1mrobot.json'; // points - robot
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
 
export default function Map() { 



  const [data, setData] = useState(['']);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://59.6.99.141:7500/robot-location')
      .then(res => {
        setData(res.data); 
        setLoading(false);
      })
      .catch(err =>{
        console.log('Error');
      })
  }, []);

  console.log();

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

  const checkedCars = [0, 1, 2];

  for (let i = 0; i < checkedCars.length; i++) {

      for (let j = 0; j < robots[checkedCars[i]][j]; j++) {
          if (!values[robots[checkedCars[i]][j]]) {
            values[robots[checkedCars[i]][j]] = 0;
          }
          values[robots[checkedCars[i]][j]]++;
      }
  }

  // value 모두 계산되었다고 가정하고 화면에 표시
  const testValues = {185748.0: 3, 185749.0: 1, 185774.0: 3, 185775.0: 3, 185773.0: 1, 185766.0: 3, 185767.0: 3, 185764.0: 1, 185765.0: 1, 186302.0: 2, 186301.0: 1, 186292.0: 3, 186293.0: 2, 186290.0: 3, 186291.0: 3, 186288.0: 3, 186289.0: 3, 186286.0: 3, 186287.0: 3, 186285.0: 3, 186276.0: 3, 186275.0: 2, 184720.0: 2, 184721.0: 2, 184718.0: 3, 184719.0: 1, 184716.0: 3, 184717.0: 3, 184715.0: 1, 184694.0: 3, 185246.0: 3, 185247.0: 2, 185245.0: 2, 185242.0: 3, 185243.0: 1, 185240.0: 2, 185241.0: 3, 185221.0: 3, 185248.0: 2, 187866.0: 3, 187867.0: 2, 187857.0: 3, 188392.0: 3, 188393.0: 3, 188390.0: 3, 188391.0: 3, 188388.0: 3, 188389.0: 3, 188387.0: 2, 188384.0: 3, 188385.0: 1, 186812.0: 3, 186813.0: 1, 186803.0: 3, 187340.0: 1, 187339.0: 2, 187330.0: 3, 181532.0: 2, 181533.0: 2, 181558.0: 3, 181559.0: 1, 182060.0: 1, 182059.0: 3, 182085.0: 3, 180478.0: 1, 180479.0: 2, 180504.0: 2, 180505.0: 3, 181006.0: 2, 181005.0: 1, 181032.0: 1, 181031.0: 2, 183640.0: 3, 183666.0: 3, 183667.0: 1, 184194.0: 2, 184193.0: 3, 184167.0: 3, 182586.0: 3, 182612.0: 3, 183113.0: 3, 183139.0: 3, 189440.0: 2, 189966.0: 3, 189967.0: 2, 189965.0: 1, 188918.0: 1, 188919.0: 1, 188916.0: 1, 188917.0: 2, 188914.0: 3, 188915.0: 1, 188912.0: 3, 188913.0: 3, 188911.0: 1, 189439.0: 3, 190492.0: 1, 169439.0: 2, 169428.0: 3, 169427.0: 3, 169440.0: 2, 169966.0: 2, 169967.0: 1, 169954.0: 3, 169953.0: 3, 168383.0: 1, 168374.0: 3, 168375.0: 3, 168384.0: 3, 168385.0: 2, 168912.0: 3, 168911.0: 1, 168900.0: 1, 168901.0: 3, 171020.0: 2, 171021.0: 1, 171548.0: 1, 171547.0: 2, 171532.0: 3, 171533.0: 2, 170494.0: 2, 170493.0: 2, 170480.0: 3, 170479.0: 2, 171006.0: 3, 167326.0: 3, 167327.0: 2, 167324.0: 3, 167325.0: 3, 167322.0: 3, 167323.0: 3, 167384.0: 3, 167856.0: 3, 167857.0: 2, 167854.0: 3, 167855.0: 3, 167852.0: 2, 167853.0: 1, 167851.0: 1, 167848.0: 3, 167849.0: 3, 177318.0: 1, 177317.0: 2, 177345.0: 3, 177844.0: 3, 177845.0: 1, 177843.0: 1, 177872.0: 3, 177873.0: 1, 176264.0: 1, 176263.0: 3, 176290.0: 2, 176291.0: 3, 176790.0: 2, 176791.0: 1, 176818.0: 3, 179452.0: 3, 179453.0: 1, 179451.0: 2, 179424.0: 1, 179425.0: 2, 179952.0: 2, 179951.0: 1, 179978.0: 3, 179979.0: 1, 178399.0: 2, 178372.0: 1, 178370.0: 1, 178371.0: 2, 178400.0: 1, 178898.0: 2, 178899.0: 1, 178897.0: 1, 178926.0: 2, 178927.0: 1, 178925.0: 2, 173112.0: 3, 173111.0: 3, 173128.0: 2, 173129.0: 1, 173656.0: 1, 173655.0: 2, 173638.0: 3, 173637.0: 1, 172058.0: 1, 172059.0: 3, 172074.0: 3, 172075.0: 1, 172602.0: 1, 172601.0: 2, 172586.0: 2, 172585.0: 3, 175236.0: 2, 175237.0: 1, 175218.0: 1, 175216.0: 3, 175217.0: 2, 175214.0: 3, 175215.0: 3, 175212.0: 2, 175213.0: 3, 175210.0: 2, 175211.0: 1, 175209.0: 1, 175764.0: 3, 175763.0: 2, 175744.0: 3, 175745.0: 1, 175742.0: 1, 175743.0: 3, 175740.0: 1, 175738.0: 2, 175739.0: 2, 175736.0: 3, 175737.0: 2, 174164.0: 3, 174165.0: 2, 174182.0: 2, 174183.0: 1, 174710.0: 1, 174709.0: 2, 174690.0: 1, 174691.0: 3}

  // gid 배열 전달되었을 때 격자에 통행량 표시하는 함수
  const gridStyle = (feature) => {
    // const confirmed = values[feature.properties.id];
    const confirmed = testValues[feature.properties.id];

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

  // 1m grid
  const gridStyle2 = (feature) => {
    // const confirmed = feature.properties.polygon_id; // polygon id가 존재하면 표시
    const confirmed = feature.properties.robot_id; // robot id가 존재하면 표시

    if (!confirmed) {
      return {
      color: '#1871D9', // stroke color
      weight: 1, // stroke width (default: 3)
      opacity: 1, // stroke opacity (default: 1.0)
      fillcolor: '#1871D9',
      fillOpacity: 0.1
      }
    } else if (confirmed == 1) {
      return {
      weight: 1, // stroke width (default: 3)
      color: '#1871D9',
      fillcolor: '#1871D9', 
      fillOpacity: 0.1
      }
    } else if (confirmed >= 2 && confirmed < 3) {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 0.3
        }
    } else if (confirmed >= 3 && confirmed < 5)  {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 0.5
        }
      } else if (confirmed >= 5 && confirmed < 7) {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 0.7
        }
      } else if (confirmed >= 7 && confirmed < 9) {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 0.9
        }
      } else if (confirmed >= 9) {
        return {
        weight: 1, // stroke width (default: 3)
        color: '#1871D9',
        fillcolor: '#1871D9', 
        fillOpacity: 1
        }
      }
  }

  // 1m grid
  const gridStyle3 = (feature) => {
    const confirmed = feature.properties.robot_id;
    // const confirmed = testValues[feature.properties.id];

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

  // grid - id popup (10m)
  const onEachFeature = (feature, layer, e) => {
    let crosspoint = 0;
    let gid;

    if (testValues[feature.properties.id] !== undefined){
      // crosspoint = values[feature.properties.id];
      crosspoint = testValues[feature.properties.id];
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
      '<div>통행량: '+crosspoint+'</div>'
    );
  };

  // grid - id popup (1m)
  const onEachFeature2 = (feature, layer, e) => {
    let crosspoint = feature.properties.robot_id;
    const gid = feature.properties.polygon_id;

    if (testValues[feature.properties.id] !== undefined){
      // crosspoint = values[feature.properties.id];
      // crosspoint = testValues[feature.properties.id];
    }
    layer.bindPopup(
      '<div>gid: '+gid+'</div>'+
      '<div>통행량: '+crosspoint+'</div>'
    );
  };

  const lineOptions = [
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, },
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, },
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, },
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, },
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, },
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'green', fillColor: 'green', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'gray', fillColor: 'gray', dashArray: 4, },
    {color: 'black', fillColor: 'black', dashArray: 4, },
    {color: 'blue', fillColor: 'blue', dashArray: 4, },
    {color: 'red', fillColor: 'red', dashArray: 4, }, 
    {color: 'green', fillColor: 'green', dashArray: 4, }, 
    {color: 'purple', fillColor: 'purple', dashArray: 4, },
  ];

  // add polylines from server
  const labeled_polylines = {}; // polyline 각각의 정보를 담을 객체
  const polylines = [];

  // 잘못된 데이터 삭제(제거)
  for (let i = 0; i < data.length; i++) {
    let temp = [];
    if (data[i].length < 800) {
      data.splice(i, 1);
      i--;
    } else {
      for (let j = 0; j < data[i].length; j++) {
        const arr = [data[i][j].lat, data[i][j].lon];
        temp.push(arr);
      }
      polylines[i] = temp;
      labeled_polylines[data[i][0].id] = polylines[i];
    }
  }

  console.log(polylines);
  console.log(labeled_polylines);

  // 고유아이디+날짜+시각
  const phone_date = Object.keys(labeled_polylines);
  console.log(phone_date);

  // pathcontainer > pathHistory 로 넘겨줄 배열 생성
  const checkbox_info = [];

  // 내부 딕셔너리
  
  // 날짜, 시각 분리
  for (let i = 0; i < phone_date.length; i++) {
    const phone_info = {};
    const phone = phone_date[i].slice(0, 36);
    const date_time = phone_date[i].slice(-19, phone_date[i].length);
    const date = date_time.split(' ')[0];
    const time = date_time.split(' ')[1];
    // console.log(phone);
    // console.log(date);
    // console.log(time);

    let robot_index = '';
    if (i < 9) {
      robot_index = '0' + (i+1).toString();
    } else {
      robot_index = (i+1).toString();
    }

    phone_info['name'] = 'Robot_' + robot_index;
    phone_info['original_id'] = phone_date[i];
    phone_info['id'] = phone;
    phone_info['date'] = date;
    phone_info['time'] = time;
    phone_info['checked'] = false;

    checkbox_info.push(phone_info);
  }

  console.log(checkbox_info);

  // console.log(Object.keys(labeled_polylines)); 

  return (
    <div className="w-full">
      <div className="flex">
        <div id='map' className='w-2/3' style={{height: '865px'}}>
          <MapContainer
            center={[37.58360620664327, 127.05843925233872]} // 서울시립대
            zoom={18} // max: 18
            scrollWheelZoom={false}
            doubleClickZoom={false}
            style={{ height: "100%", width: "100%"}}
          >
            <LocationFinder />
            <MapZoomComponent />
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              maxZoom={30}
              maxNativeZoom={19}
            />
            <SVGOverlay attributes={{ stroke: 'red' }} bounds={[
                [ 127.066548012935186, 37.577577904463759 ],
                [ 127.066553626815875, 37.583884856635493 ],
              ]}>
              <rect x="0" y="0" width="100%" height="100%" fill="blue" />
            </SVGOverlay>
            <LayersControl collapsed={false}>
              <LayersControl.Overlay name="1m 격자">
                <GeoJSON 
                  data={seouluniv_polygon} 
                  style={gridStyle2}
                  onEachFeature={onEachFeature2}
                />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="10m 격자">
                <GeoJSON 
                  data={seouluniv_10m} 
                  onEachFeature={onEachFeature2}
                  style={gridStyle2}
                />
              </LayersControl.Overlay>
              <LayersControl.Overlay name={"전체 경로 표시"}>
                <LayerGroup>
                {
                  polylines.map((polyline, i) => (
                    <Polyline 
                      key={i} 
                      pathOptions={lineOptions[i]} 
                      positions={polyline} 
                      onMouseOver={e => e.target.openPopup()}
                      onMouseOut={e => e.target.closePopup()}
                    >
                    <Popup>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 mb-1 mr-1 bg-${lineOptions[i]['color']}-600 border border-${lineOptions[i]['color']}-600 rounded-full`}></div>
                        <div className="mb-1 text-sm font-extrabold">
                          Robot_{i+1}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        2022.1.{i+1}.
                      </div>
                    </Popup>
                    </Polyline>
                  ))
                }
                </LayerGroup>
              </LayersControl.Overlay>
              {
                polylines.map((polyline, i) => (
                <LayersControl.Overlay name={'경로 ' + (i+1)}>
                    <Polyline 
                      key={i} 
                      pathOptions={lineOptions[i]} 
                      positions={polyline} 
                      onMouseOver={e => e.target.openPopup()}
                      onMouseOut={e => e.target.closePopup()}
                    >
                    <Popup>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 mb-1 mr-1 bg-${lineOptions[i]['color']}-600 border border-${lineOptions[i]['color']}-600 rounded-full`}></div>
                        <div className="mb-1 text-sm font-extrabold">
                          Robot_{i+1}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        2022.1.{i+1}.
                      </div>
                    </Popup>
                    </Polyline>
                </LayersControl.Overlay>
                ))
            }
              <LayersControl.Overlay name="사고 발생 지점">
              <LayerGroup>
                {/* {data.map((v,i) => 
                  v.map((w, j) => {
                    <CircleMarker
                      key={w.id}
                      center={[w.lat, w.lon]}
                      pathOptions={{color: 'red', fillColor: 'red', fillOpacity: 1}}
                      radius={5}
                    />
                  })
                )} */}
                <CircleMarker
                  center={[37.5832868803, 127.0594854661]}
                  pathOptions={{color: 'red', fillColor: 'red', fillOpacity: 1}}
                  radius={5}
                  eventHandlers={{
                    click: (e) => {
                      console.log('marker clicked')
                    },
                  }}
                >
                  <Popup>
                    사고 발생 지점 (3)
                    <img
                      src={image2}
                      alt={image2}
                    />
                  </Popup>
                </CircleMarker>
                <CircleMarker 
                  center={[37.5824852936, 127.0579508334]} 
                  pathOptions={{color: 'red', fillColor: 'red', fillOpacity: 1}} 
                  radius={5}
                  eventHandlers={{
                    click: (e) => {
                      console.log('marker clicked')
                    },
                  }}
                >
                  <Popup>
                    사고 발생 지점 (2)
                    <img
                      src={image1}
                      alt={image1}
                    />  
                  </Popup>
                </CircleMarker>
                <CircleMarker 
                  center={[37.5833905641, 127.0595627093]} 
                  pathOptions={{color: 'red', fillColor: 'red', fillOpacity: 1}} 
                  radius={5}
                  eventHandlers={{
                    click: (e) => {
                      console.log('marker clicked')
                    },
                  }}
                >
                  <Popup>
                    사고 발생 지점 (1)
                    <img
                      src={image2}
                      alt={image2}
                    />
                  </Popup>
                </CircleMarker>
              </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
            {/* <Legend position="bottomright" /> */}
          </MapContainer>
        </div>
        <div id='board' className="w-1/3 border-l-2 border-white" style={{background: '#07111E', minWidth: "250px"}}>
          <Dashboard />
          <PathContainer data={checkbox_info} />
        </div>
      </div>
      <div>
        {/* <button onClick={getClick} className="hover:text-blue-600">
          Click to display Polylines
        </button> */}
      </div>
      {/* {data.map((v,i) => 
        v.map((w, j) => {
          return (
            <div key={j} className="flex text-sm border-b border-indigo-400">
              <div className="mx-8">id = {w.id}</div>
              <div className="mr-8">times = {w.times}</div>
              <div className="mr-8">latlon = {w.lat}, {w.lon}</div>
            </div>
          )
        })
      )} */}
    </div>
  );
}
