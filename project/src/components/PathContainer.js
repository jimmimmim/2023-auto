import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PathHistory from './PathHistory';

export default function PathContainer({ selectedRobots, display }) {

  const robot_items = []; // 체크박스 배열 초기화 (생성 시에만 필요, checked 값 모두 false) ['']일 경우 경로 출력안됨
  const [robots, setRobots] = useState(robot_items); // 각 항목 생성 위한 로봇 배열
  const [robotids, setRobotIDs] = useState(['']); // orighinal robot id array
  const [selected, setSelected] = useState([]);   // selected robots

  axios.defaults.withCredentials = true;

  // GET
  useEffect(() => {
    axios
      .all([
        axios.get('/robot-id'),
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

  return (
    <div className={`justify-center ${display} px-6 text-lg text-left`}>
      <div className='flex items-center justify-between bg-[#1F2834]'>
        <h1 className='py-4 pl-6 tracking-wide text-white uppercase  min-w-[250px]'>경로 데이터</h1>
      </div>
      <div id='dashboard-upper' className='flex flex-col overflow-auto h-[450px] bg-[#1F2834] min-w-[250px]'>
        {
          robots.map((v, i) => (
            <PathHistory key={i} robot={v} handleChange={handleChange} />
          ))
        }
      </div>
    </div>

  );
}

PathContainer.defaultProps = {
  display: ''
}