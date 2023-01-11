import React, { useState, useRef } from 'react';

export default function PathHistory({robot, handleChange}) {

  let componentClass = "";

  if (robot.checked) {
    componentClass = "bg-gray-900"; // #2D4A65로 변경
  }

  const ref = useRef(null);

  const handleClick = () => {
    if (ref.current.checked) {
      // console.log(robot.name, 'checked');
    } else {
      // console.log(robot.name, 'unchecked');
    }
  };
  
  return (
    <>
    <div 
      className={`flex items-center justify-between px-4 py-2 
      border-b border-gray-700 hover:bg-gray-900
      ${componentClass}`}
      id='checkitem-container'
    >
      <div>
        <span className='pr-2 text-white'>{robot.name}</span>
        <span className='text-xs text-gray-500'>{robot.date}</span>
      </div>
      <input
        type="checkbox"
        className=""
        id={`check-${robot.name}`}
        ref={ref}
        name={robot.name}
        checked={robot.checked}
        onChange={() => handleChange(robot.name)}
        onClick={handleClick}
      />
      {/* <span className='w-3 h-3 bg-transparent border border-gray-500 rounded-sm cursor-pointer custom-check'></span> */}
    </div>
    </>
  );
}

PathHistory.defaultProps = {
  name: 'R_221106',
  date: '2022.01.06.'
}