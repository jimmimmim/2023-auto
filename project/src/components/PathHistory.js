import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function PathHistory({robot, handleChange}) {

  const [data, setData] = useState(['']); // individual polyline
  const [id, setID] = useState('aaaaa');

  // POST
  // robot-location: 차량 고유 아이디 통해 위경도 좌표 읽어옴
  useEffect(() => {
    if (id === 'aaaaa') {
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
    }
  }, [id]);
  
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
  // api call here
  const ref = useRef(null);
  const handleClick = () => {
    if (ref.current.checked) {
      console.log(robot.name, 'unchecked');
    } else {
      console.log(robot.name, 'checked');
      setID(robot.id);
    }
  };

  
  // console.log('data[0]: ', data[0]);
  // extract lat and lon values from 'data'
  let polyline = [] // 최종 배열 (경로아이디, 좌표배열)
  let outer = [] // 선택한 차량의 경로 좌표를 담을 배열
  for (let i = 0; i < data[0].length; i++){
    let inner = []
    // console.log(data[0][i])
    inner.push(data[0][i]['lat'])
    inner.push(data[0][i]['lon'])
    outer.push(inner);
  }

  polyline.push(id);
  polyline.push(outer);

  console.log(polyline); 
  
  return (
    <>
    <div 
      className={`flex items-center cursor-pointer justify-between hover:bg-gray-900 pl-6 pr-2
      ${componentClass}`}
      id='checkitem-container'
      onClick={() => {handleChange(robot.name); handleClick();}}
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
              id={`check-${robot.name}`}
              ref={ref}
              // name={robot.name}
              name={robot.name}
              checked={robot.checked}
              onChange={() => handleChange(robot.name)}
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