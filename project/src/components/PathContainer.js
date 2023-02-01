import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PathHistory from './PathHistory';

export default function PathContainer({selectedRobots, selectedPolylines}) {

  const robot_items = []; // 체크박스 배열 초기화 (생성 시에만 필요, checked 값 모두 false) ['']일 경우 경로 출력안됨
  const [robots, setRobots] = useState(robot_items); 
  const [data, setData] = useState({}); // individual polyline
  const [robotids, setRobotIDs] = useState(['']); // orighinal robot id array

  const [id, setID] = useState('F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F2023/01/12 15:12:55');
//   let id = 'F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F2023/01/12 15:12:55';

  // selected robots
  const [selected, setSelected] = useState([]);

  // selected data
  const [selectedData, setSelectedData] = useState({});

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

  console.log('data[0]: ', data[0]);

  // 로봇 이름 부여
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

  useEffect(() => {
    if (robots.length === 1){
      setRobots(robot_items);
    }
  }, [robot_items])


  // change button background color by css class - button removed
  let componentClass = "";

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

    // send selected robot lists from PathContainer.js to Map.js
    useEffect(() => {
        selectedRobots(selected);
    }, [selected])

    // send selected path data from PathContainer.js to Map.js
    useEffect(() => {
        selectedPolylines(selectedData);
    }, [selectedData])

    // 선택된 개별 차량(로봇) 아이디를 읽어옴
    const selectedID = selected => {
        setID(selected);
        return selected;
    };


    // const selectedData = {}
    for (let i = 0; i < selected.length; i++) {
        if (data[0][0]) {
            if (data[0][0]['id'] === selected[i]) {
                selectedData[selected[i]] = data[0];
            }
        }
    }

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