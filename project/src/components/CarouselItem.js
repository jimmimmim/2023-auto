import React, { useState, useEffect } from 'react';

export default function Item ({img, setIndex}) {

    const handleChange = (e) => {
        setIndex(e.target.value)
    }

    return (
        <>
        <label className='w-[84px] h-[54px] mx-[2px] bg-black cursor-pointer hover:bg-gray-800 overflow-hidden'>
            <input 
            type="radio" name='slider' 
            className='hidden img-slider-btn'
            value={img} 
            onChange={handleChange}
            />
            {/* <span className='flex items-center justify-center h-full text-3xl'>{img}</span> */}
            <img src={img} className='w-[84px] h-[54px] object-cover' />
        </label>
        </>
    );
}