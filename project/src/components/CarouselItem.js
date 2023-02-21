import React from 'react';

export default function CarouselItem({ img, setSelectedImg, currentImg }) {

    // let width = 'w-[78px]'; // 이미지 가로 폭 고정
    let width = ''; // 이미지 개수에 따라 가로 폭 변화

    const handleChange = (e) => {
        setSelectedImg(e.target.value);
    }

    return (
        <label className={`${width} h-[54px] mx-[4px] bg-black cursor-pointer hover:bg-gray-800 overflow-hidden`}>
            <input
                type="radio" name='slider'
                className='hidden img-slider-btn'
                value={img}
                onChange={handleChange}
                checked={img === currentImg}
            />
            <img src={img} className='w-[84px] h-[54px] object-cover' />
        </label>
    );
}