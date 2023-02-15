import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  LayerGroup,
  Polyline,
  Marker,
  Popup,
} from 'react-leaflet';
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';

import axios from 'axios';

import PathContainer from "../components/PathContainer";
import Carousel from "../components/Carousel";
import LocationFinder from "../components/LocationFinder";
import MapZoomComponent from '../components/MapZoomComponent';
// import Dashboard from "../components/Dashboard"; // chart dashboard
// import Legend from "../components/Legend";

// **** Files ***** 
import markerData from '../data/markerdata.json'; // 장애물 데이터 (속성정보 포함)
import selectedjson from '../data/selected.json'; // 경로 데이터 -> API로 받아오는 것으로 수정
import temp3grid from '../data/temp3grid.json'; // 3m 기준 전체 격자 데이터 -> API로 받아오는 것으로 수정 
import temp5grid from '../data/temp5grid.json'; // 5m 기준 전체 격자 데이터 -> API로 받아오는 것으로 수정

import icon from '../assets/icons/circle.png'; // default marker icon
import iconActive from '../assets/icons/placeholder.png'; // active(current) marker icon

export default function Map() {

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //                        [ 격자 (Grid) 레이어 표시를 위한 기본 Geojson 템플릿 ]
  //      geojson 형식을 맞춰줌 - 유효한 격자 polygon만 필터링하여 tempgrid 내 features 배열에 추가됨
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const tempgrid = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
  };

  const [robotids, setRobotIDs] = useState([]); // PathContainer에서 호출한 로봇 아이디 배열 (API 수정되어 Robot별 name 자동 부여되면 필요 없어짐)
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedPolyline, setSelectedPolyline] = useState({}); // 한 번 이상 호출된 경로 정보를 담는 객체 (선택 해제되어도 삭제하지 않음)

  const [grid3m, setGrid3m] = useState(tempgrid); // 통행량이 1 이상인 3m 격자 생성 위한 템플릿
  const [grid5m, setGrid5m] = useState(tempgrid); // 통행량이 1 이상인 5m 격자 생성 위한 템플릿
  
  const [displayCarousel, setDisplayCarousel] = useState('hidden'); // 초기 화면 - 장애물 데이터 숨김 ('hidden', 'flex')
  const [displayContainer, setDisplayContainer] = useState(''); // 초기 화면 - 경로 데이터 컨테이너 보여줌 ('', 'hidden')

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
      .catch(err => {
        console.log(err);
      })
  }, []);

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //               [ 경로 (polyline) 스타일 ]
  //      - 경로 개수에 상관없이 총 10개 필요 (0~9)
  //      - weight: 선 굵기 / color: 선 색상 / fillColor: 색상 (미지정 시 color 색상과 동일하게 적용)
  //      - dashArray: 점선 (기본값은 null, '' 전달 시 실선)
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const lineOptions = [
    { weight: 3, color: '#3e400e', fillColor: '#3e400e', dashArray: 4, },
    { weight: 3, color: '#ecb700', fillColor: '#ecb700', dashArray: 4, },
    { weight: 3, color: '#1A81EC', fillColor: '#1A81EC', dashArray: 4, },
    { weight: 3, color: '#245D6B', fillColor: '#245D6B', dashArray: 4, },
    { weight: 3, color: '#E28869', fillColor: '#E28869', dashArray: 4, },
    { weight: 3, color: '#288994', fillColor: '#288994', dashArray: 4, },
    { weight: 3, color: '#4A686A', fillColor: '#4A686A', dashArray: 4, },
    { weight: 3, color: '#C6267B', fillColor: '#C6267B', dashArray: 4, },
    { weight: 3, color: '#9D4ED5', fillColor: '#9D4ED5', dashArray: 4, },
    { weight: 3, color: '#F76301', fillColor: '#F76301', dashArray: 4, },
  ];

  // PathHistory 탭에서 선택한 차량(로봇) 배열을 읽어옴 (from PathContainer.js)
  const selectedRobots = selected => {
    setSelectedCars(selected);
  };

  // PathHistory 탭에서 선택한 차량(로봇) 배열을 읽어옴 (from PathContainer.js)
  const selectedPolylines = selected => {
    setSelectedPolyline(selected);
  };

  // PathContainer에서 호출한 차량(로봇) 전체 아이디 배열을 읽어옴 (from PathContainer.js)
  const setAllRobotIDs = selected => {
    setRobotIDs(selected);
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //       filtered polylines (2차원 위경도 좌표) - 선택된 경로에 포함된 위치좌표 배열 저장
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const selected_polylines = {};

  // selectedPolyline 대신 selectedjson
  for (let i = 0; i < selectedCars.length; i++) {

    let outer = [];
    if (selectedjson[selectedCars[i]]) {
      for (let j = 0; j < selectedjson[selectedCars[i]].length; j++) {
        let inner = [];
        inner.push(selectedjson[selectedCars[i]][j]['lat'], selectedjson[selectedCars[i]][j]['lon']);
        outer.push(inner);
      }
      selected_polylines[selectedCars[i]] = outer;
    }
  }

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //        Grid Layer - 통행량, 장애물 데이터 표출을 위해 geojson 형식 격자 레이어 추가 
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  let robots = []; // 차량별로 지나가는 격자 아이디 배열
  let values = {}; // 격자 아이디별 통행량(지나가는 선 개수) 담을 딕셔너리

  // 지나가는 격자 아이디 배열 생성하기
  // 3m, 5m, 10m 아이디 수집
  for (let i = 0; i < selectedCars.length; i++) {
    let gids = [];   // robots 배열의 내부 배열 담을 변수
    if (selectedPolyline[selectedCars[i]]) {
      for (let j = 0; j < selectedPolyline[selectedCars[i]].length; j++) {
        gids.push(selectedPolyline[selectedCars[i]][j]['id_3m']);
        gids.push(selectedPolyline[selectedCars[i]][j]['id_5m']);
      }
    }
    gids = [...new Set(gids.sort())]; // 차량 내 격자아이디 중복 제거, 아이디순 정렬(편의상)
    robots.push(gids);
  }

  console.log('robots: ', robots); // delay

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

  tempgrid['features'] = selected_grid; // 선택된 격자 좌표 배열을 features에 추가 -> geojson 파일 형식으로 변환

  // (1) 아이디별 value 저장 - total
  for (let i = 0; i < robots.length; i++) {
    for (let j = 0; j < robots[i].length; j++) {
      if (!values[robots[i][j]]) values[robots[i][j]] = 0;
      values[robots[i][j]]++;
    }
  }

  // [gid별 통행량] - values:  {3m_15841: 1, 3m_15842: 1, 3m_16225: 1, 3m_16226: 1, 3m_16227: 1, …} 

  // grid - id popup
  const onEachFeature = (feature, layer, e) => {
    const gid = feature.properties.id;
    let crosspoint = values[gid]; // 위에서 구한 values 객체를 통해 격자 아이디별 통행량 계산
    layer.bindPopup(
      '<div>gid: ' + gid + '</div>'
    );
  };

  // gid 배열 전달되었을 때 격자에 통행량 표시하는 함수
  const gridStyle35 = (feature) => {
    let gid = feature.properties.id;
    const confirmed = values[gid]; // 톻행량

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

  // +++++++++++++++++++++++++++++++++++++++++++++
  //      Marker Icon - 장애물 데이터 표시
  // +++++++++++++++++++++++++++++++++++++++++++++
  const [selectedIndex, setSelectedIndex] = useState(0); // value to catch active marker index

  // PathContainer에서 호출한 차량(로봇) 아이디 배열을 읽어옴 (from PathContainer.js)
  const getCurrentIndex = selected => {
    setSelectedIndex(selected);
  };

  const createIcon = (url, size, center = [0, 0]) => {
    return new L.Icon({
      iconUrl: url,
      iconAnchor: center,
      iconSize: size,
    });
  }

  // 마커 아이콘 변경 (클릭되었거나 carousel을 통해 선택된 지점의 아이콘을 location marker로 변경함)
  const getMarkerIcon = (index) => { // [x, y], 숫자가 클수록 왼쪽&위로 이동 (마커 이미지 변경 시 좌표 값 재조정 필요)
    if (displayCarousel === 'hidden') return createIcon(icon, '16px', [8, 10]);
    else if (index === selectedIndex) return createIcon(iconActive, '32px', [14, 31]);
    else return createIcon(icon, '16px', [8, 10]);
  }

  return (
    <div className="w-full">
      <div className="flex">
        <div id='map' className='w-2/3 h-[880px]'>
          <MapContainer
            center={[37.58360620664327, 127.05843925233872]} // 서울시립대
            zoom={18} // max: 18
            scrollWheelZoom={true}
            doubleClickZoom={true}
            style={{ height: "100%", width: "100%" }} // className으로 h-full, w-full 지정 시 지도 제대로 표출되지 않음
          >
            {/* 클릭한 지점 좌표, current zoom level 콘솔 출력 */}
            <LocationFinder />
            <MapZoomComponent />
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              maxZoom={30} // 20~30레벨은 19레벨 화질 그대로 화면만 zoom in
              maxNativeZoom={19} // 실제로 확대되는 범위
            />
            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                LayersControl: 지도 우측 상단 레이어 선택 패널
                - collapsed (default: true -> false로 둘 경우 펼쳐보기 상태로 고정) 
                
                LayersControl.Overlay: 개별 레이어 (체크박스로 선택)
                - name: 체크박스 라벨명

                LayerGroup: 레이어 내 다중 경로/컴포넌트/geojson 포함될 경우 그룹화하여 하나의 레이어 안에 통합
                ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            <LayersControl collapsed={false}>
              <LayersControl.Overlay name="3m 격자">
                <GeoJSON
                  data={temp3grid}
                  onEachFeature={onEachFeature}
                  style={gridStyle35}
                />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="5m 격자">
                <LayerGroup>
                  <GeoJSON
                    data={temp5grid}
                    onEachFeature={onEachFeature}
                    style={gridStyle35}
                  />
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="사고 발생 지점">
                <LayerGroup>
                  {
                    markerData.length > 0 &&
                    markerData.map((position, i) => (
                      <Marker // icon 적용하지 않을 경우 CircleMarker로 변경해도 무방
                        key={i}
                        position={position} // CircleMarker: position => center로 변경 필요
                        icon={getMarkerIcon(i)}
                        // pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 1 }} // CircleMarker
                        // radius={5} // CircleMarker
                        eventHandlers={{
                          click: (e) => {
                            setDisplayCarousel('flex'); // 마커 클릭 시 이미지 캐러셀 표시
                            setDisplayContainer('hidden'); // 마커 클릭 시 경로 데이터 컨테이너 숨김
                            setSelectedIndex(i); // change active icon style
                          },
                          popupclose: (e) => { // 마커 비활성화 순간을 포착하기 위해 popupclose 이벤트에 연결함
                            setDisplayCarousel('hidden'); // 마커 비활성화 시 이미지 캐러셀 숨김
                            setDisplayContainer(''); // 마커 비활성화 시 경로 데이터 컨테이너 표시
                          }
                        }}
                      >
                        <Popup // 마커 클릭 시 표시되는 팝업
                          closeButton={false} // 팝업 말풍선 내 닫기 버튼 표시 여부 (default: true)
                          className='hidden' // popupclose 이벤트를 잡아내야 하므로 생성 후 숨겨둠
                        >
                          사고 발생 지점 ({i + 1})
                        </Popup>
                      </Marker>
                    ))
                  }
                </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
            {/* individually display selected polylines - hidden panel */}
            {
              Object.keys(selected_polylines).length > 0 &&
              Object.keys(selected_polylines).map((polyline, i) => (
                <Polyline
                  key={i}
                  // 경로 첫 번째 좌표에서 읽어온 숫자로 인덱스 설정 - 색상 고정
                  pathOptions={lineOptions[selected_polylines[polyline][0][0].toString()[9]]}
                  positions={selected_polylines[polyline]}
                  eventHandlers={{
                    click: (e) => {
                      e.target.openPopup(e.latlng); // 선택한 경로 위 클릭된 지점에서 팝업 열기
                      e.target.bringToFront(); // 선택된 경로를 일시적으로 맨 앞으로 오도록 함
                    },
                    mouseover: (e) => { // 마우스 오버 시 선택된 경로에 대해 포커싱 효과 적용 - 굵은 실선
                      e.target.setStyle({
                        weight: 4,
                        dashArray: '',
                      });
                      e.target.bringToFront();
                    },
                    mouseout: (e) => { // 마우스 오버 해제 시 원래 스타일로 변경
                      e.target.setStyle(lineOptions[selected_polylines[polyline][0][0].toString()[9]]);
                      e.target.bringToBack();
                    }
                  }}
                >
                  {/* 경로 클릭 시 표시되는 팝업 */}
                  <Popup closeButton={false}>
                    <div className="flex items-center">
                      {/* <div className={`w-2 h-2 mb-1 mr-1 bg-[${lineOptions[i]['color']}] border border-[${lineOptions[i]['color']}] rounded-full`}></div> */}
                      <div className="mb-1 text-sm font-extrabold">
                        Robot_{robotids.indexOf(polyline) + 1}
                      </div>
                    </div>
                    {/* date */}
                    <div className="text-xs text-gray-400">
                      {polyline.slice(-19, polyline.length).split(' ')[0]}
                    </div>
                    {/* time */}
                    <div className="hidden text-xs text-gray-400">
                      {polyline.slice(-19, polyline.length).split(' ')[1]}
                    </div>
                  </Popup>
                </Polyline>
              ))
            }
            {/* 범례 - 지도 우측 하단 */}
            {/* <Legend position="bottomright" /> */}
          </MapContainer>
        </div>
        <div id='board' className="w-1/3 bg-[#07111E] min-w-[260px]">
          {/* 차트 컨테이너 */}
          {/* <Dashboard display={display} /> */}
          {/* 이미지 캐러셀 */}
          <Carousel display={displayCarousel} marker={selectedIndex} getCurrentIndex={getCurrentIndex} />
          {/* 경로 데이터 컨테이너 */}
          <PathContainer selectedRobots={selectedRobots} selectedPolylines={selectedPolylines} display={displayContainer} setAllRobotIDs={setAllRobotIDs} />
        </div>
      </div>
    </div>
  );
}