import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PathHistory from './PathHistory';

export default function PathContainer({selectedRobots}) {

  const robot_items = []; // 체크박스 배열 초기화 (생성 시에만 필요, checked 값 모두 false) ['']일 경우 경로 출력안됨

  const [robots, setRobots] = useState(robot_items); 

  const [data, setData] = useState(['']); // individual polyline
  const [gridData3m, setGridData3m] = useState(['']); // 3m grid
  const [gridData5m, setGridData5m] = useState(['']); // 5m grid
  const [robotids, setRobotIDs] = useState(['']); // orighinal robot id

  let [loading, setLoading] = useState(true);
  
  // dashboard display (hidden)
  const [display, setDisplay] = useState('');
  
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

  let id = "81470D5A-BFC6-4F2D-AF62-E134CA9963C72023/01/02 11:27:17"
  
  // POST
  // robot-location: 차량 고유 아이디 통해 위경도 좌표 읽어옴
  // useEffect(() => {
  //   axios
  //   .all([
  //     axios.post("/robot-location", {
  //       id: id
  //     }),
  //   ])
  //   .then(
  //     axios.spread((res) => {
  //       setData(res.data);
  //       })
  //     )
  //     .catch(err =>{
  //       console.log(err);
  //     })
  // }, [robotids]);

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

  console.log(`data: `, data);
  console.log(`id: ${id}`);
  console.log(`robotids: `, robotids);
  console.log('robots: ', robots);

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

  // send selected robot lists from PathContainer.js to Map.js
  useEffect(() => {
    selectedRobots(selected);
  }, [selected])

  console.log('selected: ', selected);
  
  return (
      <div className="justify-center px-6 text-lg text-left">
        <h1 className='py-4 pl-6 tracking-wide text-white uppercase bg-[#1F2834] min-w-[250px]'>경로 데이터</h1>
        <div id='dashboard-upper' className='flex flex-col overflow-auto h-[450px] bg-[#1F2834] min-w-[250px]'>
            {
              robots && robots.map((v, i) => (
                <PathHistory key={i} robot={v} handleChange={handleChange} polyLine={''}/>
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