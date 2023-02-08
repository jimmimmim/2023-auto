import React, { useState } from 'react';
import './style.css';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';

import CarouselItem from '../components/CarouselItem';

export default function Barrier({ display }) {

  // const display = ['flex', 'hidden'];
  // console.log('display: ', display);

  const [images, setImages] = useState([image1, image2]);
  const [selected, setSelected] = useState('');
  const [currentIndex, setCurrentIndex] = useState('');

  const setIndex = selected => {
    setSelected(selected);
    return selected;
  };

  return (
    <div className={`${display} px-6 text-white `}>
      <div className="flex flex-col justify-start w-full px-6 text-left h-[650px] min-w-[250px]">
        <div className="flex items-center justify-center h-full overflow-hidden bg-black" id='image-focused'>
          {/* <h1 className='px-4 py-3 text-[200px] tracking-wide uppercase'>{selected}</h1> */}
          <img src={selected} className='w-full h-[650px] object-cover'/>
        </div>
        <div className='mt-[-24px] flex justify-between w-full px-3 bg-black bg-opacity-70'>
          <div className='flex items-center'>
            <div className='w-[6px] h-[6px] mr-1 bg-red-600 rounded-full'></div>
            <span className='text-[14px]'>41.4033843, 2.1920389</span>
          </div>
          <div>
            <span>{images.indexOf(selected) + 1}</span>
            <span>/</span>
            <span>{images.length}</span>
          </div>
        </div>
        <div className="flex h-[100px] py-6" id='bottom-slider'>
          <div className='flex items-center justify-around w-full'>
            {/* <button className='px-3 cursor-pointer'>&lt;</button> */}
            <div className='flex justify-center w-full img-slider'>
              {images.map((img, i) => (
                <CarouselItem key={i} img={img} setIndex={setIndex}/>
              ))}
            </div>
            {/* <button className='px-3 cursor-pointer'>&gt;</button> */}
          </div>
        </div>
        {/* <h1 className='text-center'>current item - {selected}</h1> */}
        {/* <h1 className='text-center'>current index - {images.indexOf(selected)}</h1> */}
      </div>
    </div>

  );
}

Barrier.defaultProps = {
  display: 'flex'
}