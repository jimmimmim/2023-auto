import React from 'react';

export default function Barrier({display}) {

  // const display = ['flex', 'hidden'];
  console.log('display: ', display);
  
  return (
    <div className={`${display} px-6 pb-6`}>
      <div className="flex flex-col justify-start w-full text-left h-[680px] bg-[#1F2834] min-w-[250px]">
          <h1 className='px-4 py-3 text-lg tracking-wide text-white uppercase' >장애물 데이터</h1>
      </div>
    </div>

  );
}

Barrier.defaultProps = {
  display: 'flex'
}