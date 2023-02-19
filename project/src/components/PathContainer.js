import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PathHistory from './PathHistory';

export default function PathContainer({ selectedRobots, selectedPolylines, display, setAllRobotIDs }) {

  const robot_items = []; // 체크박스 배열 초기화 (생성 시에만 필요, checked 값 모두 false) ['']일 경우 경로 출력안됨
  const [robots, setRobots] = useState(robot_items);
  const [data, setData] = useState([]); // individual polyline
  const [robotids, setRobotIDs] = useState(['']); // orighinal robot id array

  const [id, setID] = useState('F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F2023/01/12 15:12:55');
  const [selected, setSelected] = useState([]);   // selected robots
  const [selectedData, setSelectedData] = useState({});   // selected data

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
      .catch(err => {
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
      .catch(err => {
        console.log(err);
      })
  }, [id]);

  if (data[0]) {
    console.log('data[0]: ', data[0]);
  }

  // 로봇 이름, 체크박스 전달값
  for (let i = 0; i < robotids.length; i++) {
    const robot_info = {};

    let robot_number = '';
    if (i < 9) {
      robot_number = '0' + (i + 1).toString();
    } else {
      robot_number = (i + 1).toString();
    }

    robot_info['name'] = 'Robot_' + robot_number;
    robot_info['id'] = robotids[i];
    robot_info['checked'] = false;

    robot_items.push(robot_info);
  }

  useEffect(() => {
    if (robots.length === 1) {
      setRobots(robot_items);
    }
  }, [robot_items])

  // remove items
  const removeItem = (id) => {
    setSelected(current =>
      current.filter(element => {
        return element !== id;
      }),
    );
  };

  // checkbox - 선택 및 해제
  const handleChange = id => {
    const copyRobots = [...robots];
    const modifiedRobots = copyRobots.map(robot => {
      if (id === robot.id) {
        robot.checked = !robot.checked;
        if (robot.checked) {
          setSelected([...new Set([...selected, robot.id])]); // 항목 추가
        } else {
          removeItem(robot.id); // 항목 삭제
        }
      }
      return robot;
    });
    setRobots(modifiedRobots);
  };

  // send selected robot lists from PathContainer.js to Map.js
  useEffect(() => {
    selectedRobots(selected);
  }, [selected])

  useEffect(() => {
    for (let i = 0; i < selected.length; i++) {
      if (data[0][0]) {
        if (data[0][0]['id'] === selected[i]) {
          selectedData[selected[i]] = data[0];
        }
      }
    }
    selectedPolylines(selectedData); // send selected path data from PathContainer.js to Map.js       // delay
    console.log('selectedData: ' , selectedData); // timely
  }, [selected.length, data[0]])

  // send robot ids from PathContainer.js to Map.js
  useEffect(() => {
    setAllRobotIDs(robotids);
  }, [robotids])

  // 선택된 개별 차량(로봇) 아이디를 읽어옴
  const selectedID = selected => {
    setID(selected);
  };

  console.log('selected: ', selected);

  return (
    <div className={`justify-center ${display} px-6 text-lg text-left`}>
      <div className='flex items-center justify-between bg-[#1F2834]'>
        <h1 className='py-4 pl-6 tracking-wide text-white uppercase  min-w-[250px]'>경로 데이터</h1>
      </div>
      <div id='dashboard-upper' className='flex flex-col overflow-auto h-[450px] bg-[#1F2834] min-w-[250px]'>
        {
          robots.map((v, i) => (
            <PathHistory key={i} robot={v} handleChange={handleChange} selectedID={selectedID} />
          ))
        }
      </div>
    </div>

  );
}

PathContainer.defaultProps = {
  display: ''
}