import Image from 'next/image';
import React, {useState} from "react"

const Carousel = ({ DATA }: any) => {
  const images = [DATA.FrontViewUrl, DATA.BackViewUrl, DATA.RightSideViewUrl, DATA.LeftSideViewUrl];

  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeImage = (index: any) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex items-center justify-center  shadow-lg pb-10">
      <div className="">
        <div className="">
          {images.map((item, index) => (
            <Image
              key={index}
              src={`data:image/png;base64, ${item}`}
              alt=""
              width={1000} height={500}
              className={`${
                index === currentImageIndex ? 'block' : 'hidden'
              } transition-opacity duration-500 ease-in-out w-[1000px] h-[500px] rounded-[5px]`}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => changeImage(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            ></span>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {images.map((item, index) => (
            <div
              key={index}
              onClick={() => changeImage(index)}
              className={`w-12 h-12 bg-gray-200 mx-2 cursor-pointer ${
                index === currentImageIndex ? 'border-blue-600' : ''
              }`}
            >
              <Image
                src={`data:image/png;base64, ${item}`}
                alt=""
                width={100}
                height={100}
                className={`w-[100px] h-[50px] rounded-[5px] ${index === currentImageIndex ? 'border-[3px] border-solid border-blue-600' : ''}`}
              />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
