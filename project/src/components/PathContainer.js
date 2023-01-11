import React, { useState, useRef } from 'react';

import PathHistory from './PathHistory';

export default function PathContainer() {

  // const robots = [['R_111', '2022.01.01.', '장애물1'], ['R_222', '2022.02.02.', '장애물2'], ['R_333', '2022.03.03', '장애물3']];

  // 샘플 데이터
  const [robots, setRobots] = useState([
    {name: "R_aaa", date: "2022.01.01", checked: false },
    {name: "R_bbb", date: "2022.02.02", checked: false },
    {name: "R_ccc", date: "2022.03.03", checked: false },
    {name: "R_ddd", date: "2022.04.04", checked: false },
    {name: "R_eee", date: "2022.05.05", checked: false },
    {name: "R_fff", date: "2022.06.06", checked: false },
    {name: "R_ggg", date: "2022.07.07", checked: false },
    {name: "R_hhh", date: "2022.08.08", checked: false },
    {name: "R_iii", date: "2022.09.09", checked: false },
    {name: "R_jjj", date: "2022.10.10", checked: false },
    {name: "R_kkk", date: "2022.11.11", checked: false },
    {name: "R_lll", date: "2022.12.12", checked: false },
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
  

  // 체크박스 - 선택 및 해제
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
  
  return (
    <div id='board' className="w-1/3 border-l-2 border-white" style={{background: '#07111E', minWidth: "250px"}}>
      <div className="justify-center text-lg text-left border-white pt-7 px-7">
        <h1 className='py-3 pl-4 tracking-wide text-white uppercase ' style={{backgroundColor: "#1F2834"}}>Path Data History</h1>
        <div id='dashboard-upper' className='flex flex-col overflow-auto h-80' style={{backgroundColor: "#1F2834" }}>
            {
              robots.map((v, i) => (
                <PathHistory key={i} robot={v} handleChange={handleChange} />
              ))
            }
        </div>
        <div className='flex flex-wrap justify-start px-3' style={{backgroundColor: "#1F2834" }}>
        {
          selected.sort().map((v, i) => (
            <button 
            key={i} 
            className={`px-3 py-1 mr-3 my-2 text-sm text-white border-white rounded-full bg-gray-700 hover:bg-gray-900 ${componentClass}`}
            onClick={() => {uncheckItem(v)}}
            >{v}</button>
          ))
        }
        </div>
      </div>
    </div>
  );
}