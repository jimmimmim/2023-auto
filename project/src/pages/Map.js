import React, { useState, useEffect, createContext, useContext } from "react";
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
import axios from 'axios';

import 'leaflet/dist/leaflet.css';

import PathContainer from "../components/PathContainer"; 
import Dashboard from "../components/Dashboard";

import LocationFinder from "../components/LocationFinder";
import MapZoomComponent from '../components/MapZoomComponent';
import Legend from "../components/Legend";

// **** Files ***** 
// import seouluniv_10m from '../data/seouluniv10104326.json'; // 10m grid
import seouluniv_10m from '../data/polygon10m_0112.json'; // 10m grid
// import seouluniv_polygon from '../data/seouluniv1mpolygon.json'; // 1m grid - polygon
// import seouluniv_polygon from '../data/grid1m_large.json'; // 1m grid - polygon - too large - ERROR
// import seouluniv_polygon from '../data/1m_data_grid.json'; // 1m grid - polygon - summarized
import seouluniv_polygon from '../data/polygon1m_0112.json'; // 1m grid - polygon - latest version ✅
// import seouluniv_polygon_3m from '../data/3m_data_grid.json'; // 3m grid - polygon - latest version ✅
// import seouluniv_polygon_5m from '../data/5m_data_grid.json'; // 5m grid - polygon - latest version ✅
import seouluniv_polygon_3m from '../data/3m_geodata_grid.json'; // 3m grid - polygon - special id
import seouluniv_polygon_5m from '../data/5m_geodata_grid.json'; // 5m grid - polygon - special id
// import seouluniv_polygon_3m from '../data/3m_data_grid_summarized.json'; // 3m grid - polygon - summarized
// import seouluniv_polygon_5m from '../data/5m_data_grid_summarized.json'; // 5m grid - polygon - summarized
// import seouluniv_polygon_3m from '../data/3m_data_grid_sum_pretty.json'; // 3m grid - polygon - summarized & beautified
// import seouluniv_polygon_5m from '../data/5m_data_grid_sum_pretty.json'; // 5m grid - polygon - summarized & beautified
// import seouluniv_robot from '../data/seouluniv1mrobot.json'; // points - robot
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
 
export default function Map() { 

  // const [values, setValues] = useState({});

  // geojson 형식을 맞춰줌 - 유효한 격자 polygon만 features에 추가됨
  const tempgrid = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
  };

  const [grid3m, setGrid3m] = useState(tempgrid);
  const [grid5m, setGrid5m] = useState(seouluniv_polygon_5m);

  axios.defaults.withCredentials = true; 

  // GET
  useEffect(() => {
    axios
    .all([
      axios.get('/getGeoData/3'),
      axios.get('/getGeoData/5')
    ])
    .then(
      axios.spread((res3, res5) => {
        setGrid3m(res3.data);
        setGrid5m(res5.data);
        })
      )
      .catch(err =>{
        console.log(err);
      })
  }, []);

  console.log('grid3m: ', grid3m);
  // console.log('seouluniv_polygon_3m: ', seouluniv_polygon_3m)
  console.log('grid5m: ', grid5m);
  // console.log('seouluniv_polygon_5m: ', seouluniv_polygon_5m)
 
  // 10m grid - valid value
  const gridStyle = (feature) => {
    // const confirmed = feature.properties.polygon_id; // polygon id가 존재하면 표시
    const confirmed = feature.properties.robot_id; // robot id가 존재하면 표시 (robot_id: value (통행량))

    if (!confirmed) {
      return {
      color: '#1871D9', // stroke color
      weight: 1, // stroke width (default: 3)
      opacity: 1, // stroke opacity (default: 1.0)
      fillcolor: '#1871D9',
      fillOpacity: 0.1
      }
    } else if (confirmed === 1) {
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

  const lineOptions = [
    {color: '#3e400e', fillColor: '#3e400e', dashArray: 4, },
    {color: '#ecb700', fillColor: '#ecb700', dashArray: 4, },
    {color: '#1A81EC', fillColor: '#1A81EC', dashArray: 4, },
    {color: '#245D6B', fillColor: '#245D6B', dashArray: 4, },
    {color: '#E28869', fillColor: '#E28869', dashArray: 4, },
    {color: '#288994', fillColor: '#288994', dashArray: 4, },
    {color: '#4A686A', fillColor: '#4A686A', dashArray: 4, },
    {color: '#C6267B', fillColor: '#C6267B', dashArray: 4, },
    {color: '#9D4ED5', fillColor: '#9D4ED5', dashArray: 4, },
    {color: '#F76301', fillColor: '#F76301', dashArray: 4, },
    {color: '#620093', fillColor: '#620093', dashArray: 4, },
    {color: '#934AB3', fillColor: '#934AB3', dashArray: 4, },
    {color: '#48C637', fillColor: '#48C637', dashArray: 4, },
    {color: '#FFAE00', fillColor: '#FFAE00', dashArray: 4, },
    {color: '#000000', fillColor: '#000000', dashArray: 4, },
  ];

  // add polylines from server
  const labeled_polylines = {}; // polyline 각각의 정보를 담을 객체
  // const polylines = [];

  // 고유아이디+날짜+시각
  const phone_date = Object.keys(labeled_polylines);

  // pathcontainer > pathHistory 로 넘겨줄 배열 생성
  const checkbox_info = [];
  
  // 날짜, 시각 분리
  for (let i = 0; i < phone_date.length; i++) {
    const phone_info = {};
    const phone = phone_date[i].slice(0, 36);
    const date_time = phone_date[i].slice(-19, phone_date[i].length);
    const date = date_time.split(' ')[0];
    const time = date_time.split(' ')[1];

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

  // console.log(Object.keys(labeled_polylines)); 
  
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedPolyline, setSelectedPolyline] = useState([]);

  
  // PathHistory 탭에서 선택한 차량(로봇) 배열을 읽어옴 (from PathContainer.js)
  const selectedRobots = selected => {
    setSelectedCars(selected);
    return selected;
  };
  
  // PathHistory 탭에서 선택한 차량(로봇) 배열을 읽어옴 (from PathContainer.js)
  const selectedPolylines = selected => {
    setSelectedPolyline(selected);
    return selected;
  };


  console.log('selectedCars: ', selectedCars);
  console.log('selectedPolyline: ', selectedPolyline);

//   PathHistory 탭에서 선택한 차량(로봇) 배열을 읽어옴 (from PathContainer.js)
//   const robotItems = selected => {
//     // setSelectedPolylines(selected);
//     return selected;
//   };

  // extract latlong
  // console.log(Object.keys(selectedPolyline));

  // filtered polylines
  const selected_polylines = [];

  for (let i = 0; i < selectedCars.length; i++) {
    let outer = [];
    if (selectedPolyline[selectedCars[i]]) {
      for (let j = 0; j < selectedPolyline[selectedCars[i]].length; j++){
        let inner = [];
        inner.push(selectedPolyline[selectedCars[i]][j]['lat'], selectedPolyline[selectedCars[i]][j]['lon']);
        outer.push(inner);
      }
      selected_polylines.push(outer);
    }
  }

  console.log('selected_polylines: ', selected_polylines);

  const setDisplayFlex = () => {
    console.log('popup closed!!!!!!!!!!!!!');
  }

  let robots = []; // 차량별로 지나가는 격자 아이디 배열
  let values = {}; // 격자 아이디별 통행량(지나가는 선 개수) 담을 딕셔너리
  
  // 지나가는 격자 아이디 배열 생성하기
  // 3m, 5m, 10m 아이디 수집
  for (let i = 0; i < selectedCars.length; i++) {
    let gids = [];   // robots 배열의 내부 배열 담을 변수
    if (selectedPolyline[selectedCars[i]]) {
      for (let j = 0; j < selectedPolyline[selectedCars[i]].length; j++){
        gids.push(selectedPolyline[selectedCars[i]][j]['id_3m']);
        gids.push(selectedPolyline[selectedCars[i]][j]['id_5m']);
        // gids.push(selectedPolyline[selectedCars[i]][j]['id_10m']);
      }
    }
    gids = [...new Set(gids.sort())]; // 차량 내 격자아이디 중복 제거, 아이디순 정렬(편의상)
    // console.log(gids);
    robots.push(gids);
    // console.log(robots);
  }

  console.log('robots: ', robots);

  // 유효한 값이 있는 격자만 선택
  let gid4grid = [] // 격자를 그리기 위한 배열 - robots 각 원소의 합집합
  for (let i = 0; i < robots.length; i++) {
    gid4grid = gid4grid.concat(robots[i]);
  }
  gid4grid = [...new Set(gid4grid.sort())]; // 3m, 5m 동시에 저장


  let selected_grid = [] // 해당되는 격자만 추출
  // 3m, 5m 격자별로 유효한 격자 아이디 추출
  for (let i = 0; i < grid3m['features'].length; i++) {
    for (let j = 0; j < gid4grid.length; j++) {
      if (grid3m['features'][i]['properties']['id'] === gid4grid[j]) {
        selected_grid.push(grid3m['features'][i]);
      }
    }
  }

  console.log('selected_grid: ', selected_grid);
  tempgrid['features'] = selected_grid;
  console.log('tempgrid: ', tempgrid);

  const temptemp = [];
  temptemp.push(tempgrid);
  console.log('temptemp[0]: ', temptemp[0]);

  // (1) 아이디별 value 저장 - total
  for (let i = 0; i < robots.length; i++) {
    for (let j = 0; j < robots[i].length; j++) {
      if (!values[robots[i][j]]) values[robots[i][j]] = 0;
      values[robots[i][j]]++;
    }
  }

  console.log('values: ', values); // gid별 통행량

// 수정 필요
// grid - id popup
const onEachFeature = (feature, layer, e) => {
  // let crosspoint = feature.properties.robot_id;
  const gid = feature.properties.id;
  let crosspoint = values[gid];

  layer.bindPopup(
    '<div>gid: '+gid+'</div>'
    // '<div>통행량: '+crosspoint+'</div>'
  );
};

// gid 배열 전달되었을 때 격자에 통행량 표시하는 함수
const gridStyle35 = (feature) => {
  let gid = feature.properties.id;
  const confirmed = values[gid];

  if (!confirmed) {
      return {
      color: '#1871D9', // stroke color
      weight: 0, // stroke width (default: 3)
      opacity: 1, // stroke opacity (default: 1.0)
      fillcolor: 'white',
      fillOpacity: 0
      }
  } else if (confirmed === 1) {
      return {
      weight: 1, // stroke width (default: 3)
      color: '#1871D9',
      fillcolor: '#1871D9', 
      fillOpacity: 0.1
      }
  } else if (confirmed === 2) {
      return {
      weight: 1, // stroke width (default: 3)
      color: '#1871D9',
      fillcolor: '#1871D9', 
      fillOpacity: 0.3
      }
  } else if (confirmed === 3) {
      return {
      weight: 1, // stroke width (default: 3)
      color: '#1871D9',
      fillcolor: '#1871D9', 
      fillOpacity: 0.5
      }
  } else if (confirmed === 4) {
    return {
    weight: 1, // stroke width (default: 3)
    color: '#1871D9',
    fillcolor: '#1871D9', 
    fillOpacity: 0.7
    }
} else if (confirmed === 5) {
  return {
  weight: 1, // stroke width (default: 3)
  color: '#1871D9',
  fillcolor: '#1871D9', 
  fillOpacity: 0.9
  }
}
else if (confirmed === 6) {
  return {
  weight: 1, // stroke width (default: 3)
  color: '#1861d9',
  fillcolor: '#1861d9', 
  fillOpacity: 0.7
  }
}
else if (confirmed === 7) {
  return {
  weight: 1, // stroke width (default: 3)
  color: '#1861d9',
  fillcolor: '#1861d9', 
  fillOpacity: 0.7
  }
}
else if (confirmed === 8) {
  return {
  weight: 1, // stroke width (default: 3)
  color: '#1861d9',
  fillcolor: '#1861d9', 
  fillOpacity: 0.8
  }
}
else if (confirmed === 9) {
  return {
  weight: 1, // stroke width (default: 3)
  color: '#1861d9',
  fillcolor: '#1861d9', 
  fillOpacity: 0.8
  }
}
else if (confirmed === 10) {
  return {
  weight: 1, // stroke width (default: 3)
  color: '#1861d9',
  fillcolor: '#1861d9', 
  fillOpacity: 0.9
  }
}
}

  return (
    <div className="w-full">
      <div className="flex">
        <div id='map' className='w-2/3' style={{height: '865px'}}>
          <MapContainer
            center={[37.58360620664327, 127.05843925233872]} // 서울시립대
            zoom={18} // max: 18
            scrollWheelZoom={true}
            doubleClickZoom={true}
            style={{ height: "100%", width: "100%"}}
          >
            <LocationFinder />
            <MapZoomComponent />
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              maxZoom={30}
              maxNativeZoom={19}
            />
            <LayersControl collapsed={false}>
              <LayersControl.Overlay name="1m 격자">
                <GeoJSON 
                  data={seouluniv_polygon} 
                  onEachFeature={onEachFeature}
                  style={gridStyle}
                />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="3m 격자">
              { 
                temptemp.map((tempgrid, i) => (
                  <GeoJSON 
                    key={i}
                    data={tempgrid} 
                    // data={grid3m} 
                    // data={gridData} 
                    onEachFeature={onEachFeature}
                    style={gridStyle35}
                  />
                ))
              }
              </LayersControl.Overlay>
              <LayersControl.Overlay name="5m 격자">
                <LayerGroup>
                  <GeoJSON 
                    data={grid5m} 
                    // data={seouluniv_polygon_5m} 
                    onEachFeature={onEachFeature}
                    style={gridStyle35}
                  />
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="10m 격자">
                <GeoJSON 
                  data={seouluniv_10m} 
                  onEachFeature={onEachFeature}
                  style={gridStyle}
                >
                </GeoJSON>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="사고 발생 지점">
              <LayerGroup>
                <CircleMarker 
                  center={[37.5833905641, 127.0595627093]} 
                  pathOptions={{color: 'red', fillColor: 'red', fillOpacity: 1}} 
                  radius={5}
                  eventHandlers={{
                    click: (e) => {
                    //   setDisplay('hidden');
                    }
                  }}
                  
                >
                  <Popup closeButton={false}>
                    사고 발생 지점 (1)
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
                    //   setDisplay('hidden');
                    }
                  }}
                >
                  <Popup closeButton={false}>
                    사고 발생 지점 (2)
                    <img
                      src={image1}
                      alt={image1}
                    />  
                  </Popup>
                </CircleMarker>
                <CircleMarker
                  center={[37.5832868803, 127.0594854661]}
                  pathOptions={{color: 'red', fillColor: 'red', fillOpacity: 1}}
                  radius={5}
                  eventHandlers={{
                    click: (e) => {
                    //   setDisplay('hidden');
                    }
                  }}
                >
                  <Popup closeButton={false}>
                    사고 발생 지점 (3)
                    <img
                      src={image2}
                      alt={image2}
                    />
                  </Popup>
                </CircleMarker>
              </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
            {/* individually display selected polylines - hidden panel */}
            {
              selected_polylines.map((polyline, i) => (
                <Polyline 
                  key={i} 
                  // 경로 첫 번째 좌표에서 읽어온 숫자로 인덱스 설정
                  pathOptions={lineOptions[polyline[0][0].toString()[9]]} 
                  positions={polyline} 
                  onMouseOver={e => e.target.openPopup()}
                  onMouseOut={e => e.target.closePopup()}
                  // onClick={console.log(`${i+1} clicked - polyline`)}
                  eventHandlers={{
                    mouseout: (e) => {
                    }
                  }}
                >
                <Popup closeButton={false}>
                  <div className="flex items-center">
                    {/* <div className={`w-2 h-2 mb-1 mr-1 bg-[${lineOptions[i]['color']}] border border-[${lineOptions[i]['color']}] rounded-full`}></div> */}
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
            {/* <Legend position="bottomright" /> */}
          </MapContainer>
        </div>
        <div id='board' className="w-1/3 bg-[#07111E] min-w-[260px]">
          {/* <Dashboard display={display} /> */}
            <PathContainer selectedRobots={selectedRobots} selectedPolylines={selectedPolylines}/>
        </div>
      </div>
    </div>
  );
}
