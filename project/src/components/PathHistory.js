import React, { useState, useEffect, useRef } from 'react';

export default function PathHistory({robot, handleChange, selectedID}) {

    const [id, setID] = useState('');

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
    //   console.log(robot.id, 'unchecked');
    } else {
    //   console.log(robot.id, 'checked');
    setID(robot.id);
    }
  };

    // send selected robot id from PathHistory.js to PathContainer.js
    useEffect(() => {
        selectedID(id);
    }, [id])
  
  return (
    <>
    <div 
      className={`flex items-center cursor-pointer justify-between hover:bg-gray-900 pl-6 pr-2
      ${componentClass}`}
      id='checkitem-container'
      onClick={() => {handleChange(robot.id); handleClick();}}
    >
      <div className='min-w-full py-2 pr-2 border-b border-[#293C4E]'>
        <div className='flex items-center justify-between'>
          <div>
            {/* <span className='pr-2 text-white'>{robot.name.slice(6, 8 )} -</span> */}
            {/* <span className='pr-2 text-white'>{robot.original_id}</span> */}
            <span className='pr-2 text-white'>{robot.name}</span>
            <span className='text-xs text-gray-500'>{robot.id}</span>
          </div>
          <div className='flex'>
            {/* checkbox - displayed when item is checked */}
            <input
              type="checkbox"
              className={`${checkboxStyle}`}
              id={`check-${robot.id}`}
              ref={ref}
              name={robot.id}
              checked={robot.checked}
              onChange={() => handleChange(robot.id)}
              onClick={e => { 
                e.stopPropagation(); 
                // handleClick();
              }}
            />
        </div>
          {/* custom checkbox - displayed only when item is unchecked */}
          <div className={`cursor-default hover:bg-black w-3 min-w-[12px] min-h-[12px] h-3 mt-[1px] ml-[1px] border border-[#727272] rounded-sm ${customcheckboxStyle}`}></div>
        </div>
      </div>
    </div>
    </>
  );
}

PathHistory.defaultProps = {
  name: 'R_221106',
  date: '2022.01.06.'
}