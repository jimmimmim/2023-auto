import React, { useRef } from 'react';

export default function PathHistory({robot, handleChange}) {

  
  // CSS styles
  let componentClass = ""; // change div background color depend on robot.checked (boolean)
  let checkboxStyle = ""; // custom checkbox
  let customcheckboxStyle = ""; // custom checkbox
  if (robot.checked) {
    componentClass = "bg-[#2D4A65]";
    customcheckboxStyle = 'hidden';
  } else {
    checkboxStyle = 'hidden';
  }

  // check whether robot.checked is true or false
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
      className={`flex items-center cursor-pointer justify-between px-4 py-2 
      border-b border-gray-700 hover:bg-gray-900
      ${componentClass}`}
      id='checkitem-container'
      onClick={() => handleChange(robot.name)}
    >
      <div>
        <span className='pr-2 text-white'>{robot.name}</span>
        <span className='text-xs text-gray-500'>{robot.date}</span>
      </div>
      <div className='flex'>
        {/* checkbox - displayed when item is checked */}
        <input
          type="checkbox"
          className={`${checkboxStyle}`}
          id={`check-${robot.name}`}
          ref={ref}
          name={robot.name}
          checked={robot.checked}
          onChange={() => handleChange(robot.name)}
          onClick={e => { 
            e.stopPropagation(); 
            handleClick();
          }}
        />
        {/* custom checkbox - displayed only when item is unchecked */}
        <div className={`cursor-default hover:bg-black w-3 h-3 mt-[1px] ml-[1px] border border-[#727272] rounded-sm ${customcheckboxStyle}`}></div>
      </div>
    </div>
    </>
  );
}

PathHistory.defaultProps = {
  name: 'R_221106',
  date: '2022.01.06.'
}