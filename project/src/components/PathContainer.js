import React, { useState, useEffect } from 'react';

import PathHistory from './PathHistory';

export default function PathContainer({data, selectedRobots}) {
  
  const [robots, setRobots] = useState(data); 

  useEffect(() => {
    if (robots.length === 0) {
      setRobots(data);
    }
  }, [robots.length, data])

  // selected robots
  const [selected, setSelected] = useState([]);

  // change button background color by css class - button removed
  // let componentClass = "";

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
  
  return (
      <div className="justify-center px-6 text-lg text-left">
        <h1 className='py-4 pl-6 tracking-wide text-white uppercase bg-[#1F2834] min-w-[250px]'>경로 데이터</h1>
        <div id='dashboard-upper' className='flex flex-col overflow-auto h-80 bg-[#1F2834] min-w-[250px]'>
            {
              robots && robots.map((v, i) => (
                <PathHistory key={i} robot={v} handleChange={handleChange}/>
              ))
            }
        </div>
        {/* only for check selected list */}
        {/* <div className='flex flex-wrap justify-start px-3 min-w-[260px] bg-[#1F2834]'>
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