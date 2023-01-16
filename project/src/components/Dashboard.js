import React, { useState, useRef } from 'react';
import Chart from 'react-apexcharts';

import Chart01 from './Chart01';

export default function Dashboard() {
  
  return (
    <div className='flex px-6 pt-6'>
      <div className="flex flex-col justify-start w-full mr-6 text-lg text-left h-72" style={{backgroundColor: "#1F2834"}}>
          <h1 className='px-4 py-3 tracking-wide text-white uppercase' >평균 주행속도</h1>
          <Chart01 />
      </div>
      <div className="justify-start w-full text-lg text-left" style={{backgroundColor: "#1F2834"}}>
          <h1 className='px-4 py-3 tracking-wide text-white uppercase'>인식 개체수 변화</h1>
          <Chart01 />
      </div>
    </div>

  );
}