import React from 'react';

export default function Dashboard() {
  return (
    <div id='board' className="w-1/3 border-l-2 border-white" style={{backgroundColor: '#07111E'}}>
      <div className="p-0 px-2 text-lg text-left border-white">
        <div id='dashboard-upper' className='flex justify-around w-full py-4 h-80'>
          <div className='bg-gray-800 w-72'></div>
          <div className='bg-gray-800 w-72'></div>
        </div>
        <div id='dashboard-bottom' className='grid grid-cols-2 grid-rows-4 mx-3 mt-2 gap-x-5 gap-y-5'>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-blue-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
          <div className='flex items-center justify-center h-16 font-semibold text-center text-white bg-gray-800 cursor-pointer'>R_230106</div>
        </div>
      </div>
    </div>
  );
}