import React from 'react';

import PathHistory from './PathHistory';

export default function PathContainer() {
  return (
    <div id='board' className="w-1/3 border-l-2 border-white" style={{background: '#07111E'}}>
      <div className="flex justify-center text-lg text-left border-white pt-7 px-7">
        <div id='dashboard-upper' className='flex flex-col h-80' style={{width: '580px', backgroundColor: "#1F2834" }}>
            <h1 className='py-3 pl-3 font-semibold text-white uppercase'>Path Data History</h1>
            <PathHistory />
            <PathHistory />
            <PathHistory />
        </div>
      </div>
    </div>
  );
}