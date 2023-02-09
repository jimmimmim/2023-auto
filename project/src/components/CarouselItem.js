import React, { useState, useEffect } from 'react';

export default function CarouselItem ({img, setSelectedImg, currentImg}) {

    const handleChange = (e) => {
        setSelectedImg(e.target.value)
    }

    return (
        <>
        <label className='w-[78px] h-[54px] mx-[2px] bg-black cursor-pointer hover:bg-gray-800 overflow-hidden'>
            <input 
            type="radio" name='slider' 
            className='hidden img-slider-btn'
            value={img} 
            onChange={handleChange}
            checked={img===currentImg}
            />
            <img src={img} className='w-[84px] h-[54px] object-cover' />
        </label>
        </>
    );
}