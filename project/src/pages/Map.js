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
// import seouluniv_polygon from '../data/grid1m_large.json'; // 1m grid - polygon - too large - ERROR
import seouluniv_polygon from '../data/polygon1m_0112.json'; // 1m grid - polygon - latest version
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
        console.log(err);
      })
  }, []);

  console.log();

  // 1m grid - valid value
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

  // grid - id popup (1m)
  const onEachFeature = (feature, layer, e) => {
    let crosspoint = feature.properties.robot_id;
    const gid = feature.properties.polygon_id;


    layer.bindPopup(
      '<div>gid: '+gid+'</div>'+
      '<div>통행량: '+crosspoint+'</div>'
    );
  };

  const lineOptions = [
    {color: '#3e400e', fillColor: '#3e400e', dashArray: 4, },
    {color: '#ecb700', fillColor: '#ecb700', dashArray: 4, },
    {color: '#1A81EC', fillColor: '#1A81EC', dashArray: 4, },
    {color: '#23BFEC', fillColor: '#23BFEC', dashArray: 4, },
    {color: '#84E756', fillColor: '#84E756', dashArray: 4, },
    {color: '#48C637', fillColor: '#48C637', dashArray: 4, },
    {color: '#9D4ED5', fillColor: '#9D4ED5', dashArray: 4, },
    {color: '#FFAE00', fillColor: '#FFAE00', dashArray: 4, },
    {color: '#FFF588', fillColor: '#FFF588', dashArray: 4, },
    {color: '#25B0E9', fillColor: '#25B0E9', dashArray: 4, },
    {color: '#99DD1C', fillColor: '#99DD1C', dashArray: 4, },
    {color: '#F76301', fillColor: '#F76301', dashArray: 4, },
    {color: '#C6267B', fillColor: '#C6267B', dashArray: 4, },
    {color: '#934AB3', fillColor: '#934AB3', dashArray: 4, },
    {color: '#620093', fillColor: '#620093', dashArray: 4, },
    {color: '#000000', fillColor: '#000000', dashArray: 4, },
    {color: '#245D6B', fillColor: '#245D6B', dashArray: 4, },
    {color: '#E28869', fillColor: '#E28869', dashArray: 4, },
    {color: '#288994', fillColor: '#288994', dashArray: 4, },
    {color: '#77C4D1', fillColor: '#77C4D1', dashArray: 4, },
    {color: '#4A686A', fillColor: '#4A686A', dashArray: 4, },
    {color: '#3e400e', fillColor: '#3e400e', dashArray: 4, },
    {color: '#ecb700', fillColor: '#ecb700', dashArray: 4, },
    {color: '#1A81EC', fillColor: '#1A81EC', dashArray: 4, },
    {color: '#23BFEC', fillColor: '#23BFEC', dashArray: 4, },
    {color: '#84E756', fillColor: '#84E756', dashArray: 4, },
    {color: '#48C637', fillColor: '#48C637', dashArray: 4, },
    {color: '#9D4ED5', fillColor: '#9D4ED5', dashArray: 4, },
    {color: '#FFAE00', fillColor: '#FFAE00', dashArray: 4, },
    {color: '#FFF588', fillColor: '#FFF588', dashArray: 4, },
    {color: '#25B0E9', fillColor: '#25B0E9', dashArray: 4, },
    {color: '#99DD1C', fillColor: '#99DD1C', dashArray: 4, },
    {color: '#F76301', fillColor: '#F76301', dashArray: 4, },
    {color: '#C6267B', fillColor: '#C6267B', dashArray: 4, },
    {color: '#934AB3', fillColor: '#934AB3', dashArray: 4, },
    {color: '#620093', fillColor: '#620093', dashArray: 4, },
    {color: '#000000', fillColor: '#000000', dashArray: 4, },
    {color: '#245D6B', fillColor: '#245D6B', dashArray: 4, },
    {color: '#E28869', fillColor: '#E28869', dashArray: 4, },
    {color: '#288994', fillColor: '#288994', dashArray: 4, },
    {color: '#77C4D1', fillColor: '#77C4D1', dashArray: 4, },
    {color: '#4A686A', fillColor: '#4A686A', dashArray: 4, },
  ];

  // add polylines from server
  const labeled_polylines = {}; // polyline 각각의 정보를 담을 객체
  const polylines = [];

  // 잘못 측정된 데이터 삭제 (측정시간 800초 미만 데이터 제거)
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
  
  const [selectedPolylines, setSelectedPolylines] = useState(polylines);

  // PathHistory 탭에서 선택한 차량(로봇) 배열을 읽어옴
  const selectedRobots = selected => {
    setSelectedPolylines(selected);
    return selected;
  };

  // filtered polylines
  const selected_polylines = [];

  // get original_id by robot name
  for (let i = 0; i < selectedPolylines.length; i++) {
    for (let j = 0; j < checkbox_info.length; j++) {
      if (checkbox_info[j]['name'] === selectedPolylines[i]) {
        // console.log(checkbox_info[j]['original_id']);
        // console.log(labeled_polylines[checkbox_info[j]['original_id']]); // 선택된 original id에 해당되는 폴리라인 출력
        selected_polylines[i] = labeled_polylines[checkbox_info[j]['original_id']];
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
                  style={gridStyle}
                  onEachFeature={onEachFeature}
                />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="10m 격자">
                <GeoJSON 
                  data={seouluniv_10m} 
                  onEachFeature={onEachFeature}
                  style={gridStyle}
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
                </LayerGroup>
              </LayersControl.Overlay>
              {/* individually display selected polylines - hidden panel */}
              {
                selected_polylines.map((polyline, i) => (
                  <Polyline 
                    key={i} 
                    pathOptions={lineOptions[i]} 
                    positions={polyline} 
                    onMouseOver={e => e.target.openPopup()}
                    onMouseOut={e => e.target.closePopup()}
                  >
                  <Popup>
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
              <LayersControl.Overlay name="사고 발생 지점">
              <LayerGroup>
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
              </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
            {/* <Legend position="bottomright" /> */}
          </MapContainer>
        </div>
        <div id='board' className="w-1/3 bg-[#07111E] min-w-[260px]">
          <Dashboard />
          <PathContainer data={checkbox_info} selectedRobots={selectedRobots} />
        </div>
      </div>
    </div>
  );
}
