import React, { useState, useRef } from 'react';

import PathHistory from './PathHistory';

export default function PathContainer() {

  // const robots = [['R_111', '2022.01.01.', '장애물1'], ['R_222', '2022.02.02.', '장애물2'], ['R_333', '2022.03.03', '장애물3']];

  // 샘플 데이터
  const [robots, setRobots] = useState([
    {name: "R_111", date: "2022.01.01", checked: false },
    {name: "R_222", date: "2022.02.02", checked: false },
    {name: "R_333", date: "2022.03.03", checked: false },
    {name: "R_444", date: "2022.04.04", checked: false },
    {name: "R_555", date: "2022.05.05", checked: false },
    {name: "R_666", date: "2022.06.06", checked: false },
    {name: "R_777", date: "2022.07.07", checked: false },
    {name: "R_888", date: "2022.08.08", checked: false },
  ]);
  
  const [selected, setSelected] = useState([]);

  let componentClass = "";

  // 항목 삭제
  const removeItem = (name) => {
    setSelected(current =>
      current.filter(element => {
        return element !== name;
      }),
    );
  };

  // checked 해제 (false)
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
  

  // 체크
  const handleChange = name => {
    const copyRobots = [...robots];
    const modifiedRobots = copyRobots.map(robot => {
      if (name === robot.name) {
        robot.checked = !robot.checked;
        if (robot.checked) {
          // 항목 추가
          setSelected([...new Set([...selected, robot.name])])
        } else {
          removeItem(robot.name);
        }
      }
      return robot;
    });
    setRobots(modifiedRobots);
  };
  
  return (
    <div id='board' className="w-1/3 border-l-2 border-white" style={{background: '#07111E', minWidth: "250px"}}>
      <div className="justify-center text-lg text-left border-white pt-7 px-7">
        <h1 className='py-3 pl-4 font-semibold text-white uppercase' style={{backgroundColor: "#1F2834"}}>Path Data History</h1>
        <div id='dashboard-upper' className='flex flex-col overflow-auto h-80' style={{backgroundColor: "#1F2834" }}>
            {
              robots.map((v, i) => (
                <PathHistory key={i} robot={v} handleChange={handleChange}/>
              ))
            }
            <div className='flex flex-wrap justify-start px-3 py-2' >
            {
              selected.sort().map((v, i) => (
                <button 
                key={i} 
                className={`px-3 py-1 mr-3 text-sm text-white border-white rounded-full bg-gray-700 hover:bg-gray-900 ${componentClass}`}
                onClick={() => {uncheckItem(v)}}
                >{v}</button>
              ))
            }
            </div>
        </div>
      </div>
    </div>
  );
}