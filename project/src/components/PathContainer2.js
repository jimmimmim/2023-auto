import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PathHistory from './PathHistory';

export default function PathContainer({selectedRobots, selectedPolylines}) {

  const robot_items = []; // 체크박스 배열 초기화 (생성 시에만 필요, checked 값 모두 false) ['']일 경우 경로 출력안됨
  const [robots, setRobots] = useState(robot_items); 
  const [data, setData] = useState(['']); // individual polyline
  const [robotids, setRobotIDs] = useState(['']); // orighinal robot id array

  const [id, setID] = useState(''); // current id
  const [final, setFinal] = useState(''); // current id's final data

  axios.defaults.withCredentials = true; 

  // GET
  useEffect(() => {
    axios
    .all([
      axios.get('/robot-id')
    ])
    .then(
      axios.spread((resid) => {
        setRobotIDs(resid.data);
        })
      )
      .catch(err =>{
        console.log(err);
      })
  }, []);

  // POST
  // robot-location: 차량 고유 아이디 통해 위경도 좌표 읽어옴
  useEffect(() => {
    axios
    .all([
      axios.post("/robot-location", {
        id: id
      }),
    ])
    .then(
      axios.spread((res) => {
        setData(res.data);
        })
      )
      .catch(err =>{
        console.log(err);
      })
  }, [id]);

  let outer = [];
  for (let i = 0; i < data[0].length; i++) {
    let inner = [];
    inner.push(data[0][i]['lat']);
    inner.push(data[0][i]['lon']);
    outer.push(inner);
  }

  useEffect(() => {
    setFinal(outer);
  }, [])

  console.log('id: ', id, '\n\nfinal: ', final);

  // selected lines
  const [selectedPolyline, setSelectedPolyline] = useState({});

  for (let i = 0; i < robotids.length; i++) {
    const robot_info = {};
    
    let robot_number = '';
    if (i < 9) {
      robot_number = '0' + (i+1).toString();
    } else {
      robot_number = (i+1).toString();
    }

    robot_info['name'] = 'Robot_' + robot_number;
    robot_info['id'] = robotids[i];
    robot_info['checked'] = false;

    robot_items.push(robot_info);
  }

  console.log('robot_items: ', robot_items);

  useEffect(() => {
    if (robots.length === 1){
      setRobots(robot_items);
    }
  }, [robot_items])

  console.log(`robotids: `, robotids);
  // "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F2023/01/02 11:02:11"

  console.log('robots: ', robots);
  // {name: 'Robot_01', id: '2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F2023/01/02 11:02:11', checked: true}

  // selected robots
  const [selected, setSelected] = useState([]);


  // change button background color by css class - button removed
  let componentClass = "";

  // remove items
  const removeItem = (name) => {
    setSelected(current =>
      current.filter(element => {
        return element !== name;
      }),
    );
  };

  // uncheck - used only in buttons
  const uncheckItem = (name) => {
    const copyRobots = [...robots];
    const modifiedRobots = copyRobots.map(robot => {
      if (name === robot.name) {
        robot.checked = !robot.checked;
        if (!robot.checked) {
          removeItem(robot.name);
        }
      }
      return robot;
    });
    setRobots(modifiedRobots);
  };
  

  // checkbox - 선택 및 해제
  const handleChange = name => {
    const copyRobots = [...robots];
    const modifiedRobots = copyRobots.map(robot => {
      if (name === robot.name) {
        robot.checked = !robot.checked;
        if (robot.checked) {
          setSelected([...new Set([...selected, robot.name])]); // 항목 추가
        } else {
          removeItem(robot.name); // 항목 삭제
        }
      }
      return robot;
    });
    setRobots(modifiedRobots);
  };

  for (let i = 0; i < robots.length; i++) {
    for (let j = 0; j < selected.length; j++) {
      if (robots[i]['name'] === selected[j]) {
        selectedPolyline[robots[i]['id']] = final;
      }
    }
  }


  // console.log('selectedPolyline: ', selectedPolyline)

  // send selected robot lists from PathContainer.js to Map.js
  useEffect(() => {
    selectedRobots(selected);
  }, [selected])

  // send selected polyline lists from PathContainer.js to Map.js
  useEffect(() => {
    selectedPolylines(selectedPolyline);
  }, [selected])

  // console.log('selected: ', selected);

  // 선택된 개별 차량(로봇) 아이디를 읽어옴
  const selectedID = selected => {
    setID(selected);
    return selected;
  };
  
  return (
      <div className="justify-center px-6 text-lg text-left">
        <h1 className='py-4 pl-6 tracking-wide text-white uppercase bg-[#1F2834] min-w-[250px]'>경로 데이터</h1>
        <div id='dashboard-upper' className='flex flex-col overflow-auto h-[450px] bg-[#1F2834] min-w-[250px]'>
            {
              robots && robots.map((v, i) => (
                <PathHistory key={i} robot={v} handleChange={handleChange} selectedID={selectedID}/>
              ))
            }
        </div>
        {/* only for check selected list */}
        <div className='flex flex-wrap justify-start px-6 min-w-[260px] bg-[#1F2834]'>
        {
          // sort by robot name
          selected.sort().map((v, i) => (
          // selected.map((v, i) => (
            <button 
            key={i} 
            className={`px-3 py-1 mr-3 my-2 text-sm text-white rounded-full bg-gray-700 hover:bg-gray-900 ${componentClass}`}
            onClick={() => {uncheckItem(v);}}
            >{v}</button>
          ))
        }
        </div>
      </div>

  );
}