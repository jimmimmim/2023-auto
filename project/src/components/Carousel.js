import React, { useEffect, useState, forwardRef, useRef } from 'react';
import './style.css';

import CarouselItem from './CarouselItem';
import markerData from '../data/markerdata.json';

export default function Carousel({ display, marker, getCurrentIndex }) {

  const [images, setImages] = useState([]); // 장애물 이미지 배열
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스
  const [currentImg, setCurrentImg] = useState(images[0]); // 현재 선택된 이미지 - 큰 화면

  // images from json file
  useEffect(() => {
    for (let i = 0; i < markerData.length; i++) {
      images.push(markerData[i]['url']);
    }
  }, [images])

  // read selected image from CarouselItem.js
  const setSelectedImg = selected => {
    setCurrentIndex(images.indexOf(selected));
    return selected;
  };

  // image carousel button ( > )
  const onIncrease = () => {
    (currentIndex < images.length - 1) ? setCurrentIndex(idx => idx + 1) : setCurrentIndex(0);
  };

  // image carousel button ( < )
  const onDecrease = () => {
    (currentIndex !== 0) ? setCurrentIndex(idx => idx - 1) : setCurrentIndex(images.length - 1);
  };

  // 클릭한 마커 인덱스에 해당하는 이미지 선택
  useEffect(() => {
    setCurrentIndex(marker);
  }, [marker])

  // set current image by current index (handled by slider buttons)
  // send current index from Carousel.js to Map.js
  useEffect(() => {
    setCurrentImg(images[currentIndex]);
    getCurrentIndex(currentIndex);
  }, [currentIndex])

  let imglat = 37.58290073729356; // default
  let imglon = 127.06014163989997; // default
  if (markerData[images.indexOf(currentImg)]) {
    if (markerData[images.indexOf(currentImg)]['lat'] && markerData[images.indexOf(currentImg)]['lon']) {
      imglat = markerData[images.indexOf(currentImg)]['lat'];
      imglon = markerData[images.indexOf(currentImg)]['lon'];
    }
  }

  return (
    <div className={`${display} px-6 text-white`}>
      <div className="flex flex-col justify-start w-full px-6 text-left h-[650px] min-w-[520px]">
        {/* +++++ focused image +++++ */}
        <div className="flex items-center justify-center h-full overflow-hidden bg-black" id='image-focused'>
          <img src={currentImg} className='w-full h-[650px] object-cover' />
        </div>
        <div className='mt-[-24px] flex justify-between w-full px-3 bg-black bg-opacity-70'>
          <div className='flex items-center'>
            <div className='w-[6px] h-[6px] mr-1 bg-red-600 rounded-full'></div>
            <span className='text-[14px]'>
              {imglat}, {imglon}
            </span>
          </div>
          <div>
            <span>{images.indexOf(currentImg) + 1}</span>
            <span>/</span>
            <span>{images.length}</span>
          </div>
        </div>
        {/* ++++ bottom image slider ++++ */}
        <div className="flex min-w-[480px] h-[100px] py-6" id='bottom-slider'>
          <div className='flex items-center justify-around w-full'>
            <button
              className='px-3 cursor-pointer'
              onClick={() => { onDecrease(); }}
            >
              &lt;
            </button>
            {/* sliding window (displayed area) - short */}
            <div className='flex justify-center w-full overflow-hidden' id='slide-window'>
              {/* actual images - longer */}
              <div className={`flex`} id='image-slider'>
                {images.map((img, i) => (
                  <CarouselItem key={i} img={img} setSelectedImg={setSelectedImg} currentImg={currentImg} />
                ))}
              </div>
            </div>
            <button
              className='px-3 cursor-pointer'
              onClick={() => { onIncrease(); }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

Carousel.defaultProps = {
  display: 'flex'
}