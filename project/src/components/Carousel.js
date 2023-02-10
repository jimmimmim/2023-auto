import React, { useEffect, useState, forwardRef, useRef } from 'react';
import './style.css';
// import image1 from '../assets/images/image1.png';
// import image2 from '../assets/images/image2.png';
// import image3 from '../assets/images/image3.png';
// import image4 from '../assets/images/image4.png';
// import image5 from '../assets/images/image5.png';
// import image6 from '../assets/images/image6.png';
// import image7 from '../assets/images/image7.png';
// import image8 from '../assets/images/image8.png';

import CarouselItem from './CarouselItem';

export default function Carousel({ display }) {

  // ++++ 마커 클릭 시 display 변경
  // const display = ['flex', 'hidden'];
  // console.log('display: ', display);

  // const [images, setImages] = useState([image1, image2, image3, image4, image5]); // 장애물 이미지 배열 - 이후 api를 통해 받아오는 것으로 수정
  const [images, setImages] = useState([]); // 장애물 이미지 배열
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스
  const [currentImg, setCurrentImg] = useState(images[0]); // 현재 선택된 이미지 - 큰 화면

  const [move, setMove] = useState('');
  const currentItem = useRef(); // 슬라이드 아이템 좌우 이동 위한 시작 좌표값

  // useEffect(() => {
  //   currentItem.current.focus();
  //   currentItem.current.style.border = '3px solid red';
  //   console.log(currentItem.current.style.border);
  // }, [currentIndex])

  // random image api - 1000*1000 size (5000으로 바꾸면 고화질 but 로딩 매우 느림)
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      images.push(`https://picsum.photos/1000/1000?random=${i}`)
    }
    console.log(images);
  }, [images]);

  // read selected image from CarouselItem.js
  const setSelectedImg = selected => {
    setCurrentIndex(images.indexOf(selected));
    return selected;
  };

  // image slider buttons
  const onIncrease = () => {
    (currentIndex < images.length - 1) ? setCurrentIndex(idx => idx + 1) : setCurrentIndex(0);
  };

  const onDecrease = () => {
    (currentIndex !== 0) ? setCurrentIndex(idx => idx - 1) : setCurrentIndex(images.length - 1);
  };

  const onRight = () => {
    setMove('slide-right');

  }

  const onLeft = () => {
    setMove('slide-left');
  }

  // set current image depend on current index (handled by slider buttons)
  useEffect(() => {
    setCurrentImg(images[currentIndex]);
  }, [currentIndex])


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
            <span className='text-[14px]'>41.4033843, 2.1920389</span>
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
              <div className={`flex ${move}`} id='image-slider'>
                {images.map((img, i) => (
                  <CarouselItem key={i} img={img} setSelectedImg={setSelectedImg} currentImg={currentImg} />
                ))}
              </div>
            </div>
            <button
              // ref={currentItem}
              className='px-3 cursor-pointer'
              onClick={() => { onIncrease(); }}
            >
              &gt;
            </button>
          </div>
        </div>
        {/* <h1 className='text-center'>currentIndex - {currentIndex}</h1> */}
        {/* <h1 className='text-center'>currentImg - {currentImg}</h1> */}
      </div>
    </div>

  );
}

Carousel.defaultProps = {
  display: 'flex'
}