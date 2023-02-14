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

  const [checkedAll, setCheckedAll] = useState(true); // 선택 초기화 버튼 (이후 전체선택/전체해제로 수정)

  axios.defaults.withCredentials = true;

  // CSS styles - 전체선택
  let componentClass = ""; // change div background color depend on checkedAll (boolean)
  let checkboxStyle = ""; // custom checkbox
  let customcheckboxStyle = ""; // custom checkbox
  if (checkedAll) {
    componentClass = "bg-[#2D4A65]";
    customcheckboxStyle = 'hidden';
  } else {
    checkboxStyle = 'hidden';
  }

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

  // 로봇 이름 부여
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
  // }, [])

  // remove items
  const removeItem = (id) => {
    setSelected(current =>
      current.filter(element => {
        return element !== id;
      }),
    );
  };

  // uncheck - used only in buttons
  const uncheckItem = (id) => {
    const copyRobots = [...robots];
    const modifiedRobots = copyRobots.map(robot => {
      if (id === robot.id) {
        robot.checked = !robot.checked;
        if (!robot.checked) {
          removeItem(robot.id);
        }
      }
      return robot;
    });
    setRobots(modifiedRobots);
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

  // checkbox - 전체 선택
  const handleChangeAll = () => {
    setSelected([]); // 전체 해제
    console.log('checkedAll: ', checkedAll)
  }

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
    selectedPolylines(selectedData);
    console.log(selectedData);
  }, [selected.length, data[0]])

  // send selected path data from PathContainer.js to Map.js
  useEffect(() => {
    selectedPolylines(selectedData);
  }, [selectedData])

  // send robot ids from PathContainer.js to Map.js
  useEffect(() => {
    setAllRobotIDs(robotids);
  }, [robotids])

  // 선택된 개별 차량(로봇) 아이디를 읽어옴
  const selectedID = selected => {
    setID(selected);
    return selected;
  };

  console.log('selected: ', selected);
  console.log('selectedData: ', selectedData); // delay

  // 하나라도 체크되어 있으면 선택 초기화 버튼 활성화
  useEffect(() => {
    (selected.length > 0) ? setCheckedAll(true) : setCheckedAll(false)
  }, [selected])

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
      {/* only for check selected list */}
      {/* <div className='flex flex-wrap justify-start px-6 min-w-[260px] bg-[#1F2834]'>
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
        </div> */}
    </div>

  );
}

PathContainer.defaultProps = {
  display: ''
}