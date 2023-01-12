import React, { useState, useRef } from 'react';
import Chart from 'react-apexcharts';

import Chart01 from './Chart01';

export default function Dashboard() {
  
  return (
    <div className='flex'>
        <div className="flex flex-col justify-center w-full text-lg text-left pt-7 pl-7">
            <h1 className='px-4 py-3 tracking-wide text-white uppercase ' style={{backgroundColor: "#1F2834"}}>평균 주행속도</h1>
            <Chart01 />
        </div>
        <div className="justify-center w-full text-lg text-left pt-7 pr-7">
            <h1 className='px-4 py-3 tracking-wide text-white uppercase ' style={{backgroundColor: "#1F2834"}}>인식 개체수 변화</h1>
            <Chart01 />
        </div>
    </div>

  );
}