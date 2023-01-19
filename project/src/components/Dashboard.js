import React from 'react';

import Chart01 from './Chart01';
import Chart02 from './Chart02';

export default function Dashboard() {

  let display = ['flex', 'hidden'];
  
  return (
    <div className={`${display[0]} px-6 pb-6`}>
      <div className="flex flex-col justify-start w-full mr-6 text-left h-72 bg-[#1F2834] min-w-[250px]">
          <h1 className='px-4 py-3 text-lg tracking-wide text-white uppercase' >평균 주행속도</h1>
          <p className='mt-4 text-center text-white'>12km/h</p>
          <Chart01 />
          <p className='text-center text-white'>법정최대시속 20km/h</p>
      </div>
      <div className="justify-start w-full text-lg text-left bg-[#1F2834] min-w-[200px]">
          <h1 className='px-4 py-3 tracking-wide text-white uppercase'>인식 개체수 변화</h1>
          <Chart02 />
      </div>
    </div>

  );
}