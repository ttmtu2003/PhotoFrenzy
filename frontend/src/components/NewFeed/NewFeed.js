import React from "react"
import './style.scss'
import { Plus } from "react-feather"
import mockData1 from "../../assets/pictures/mockData1.jpg"
import mockData2 from "../../assets/pictures/mockData2.jpg"
import mockData3 from "../../assets/pictures/mockData3.jpg"

const images = [
  {
    src: mockData1,
    width: '10px',
    height: '30%',
  },
  {
    src: mockData2,
    width: '30%',
    height: '30%',
  },
  {
    src: mockData3,
    width: '100%',
    height: '100%',
  },
  {
    src: mockData1,
    width: '10px',
    height: '30%',
  },
  {
    src: mockData2,
    width: '30%',
    height: '30%',
  },
  {
    src: mockData3,
    width: '100%',
    height: '100%',
  },
];

const NewFeed = () => {
  return (
    <div className="p-3 t-mt-[4rem]">
      {/* post button */}
      <div className="t-fixed t-z-30 t-top-0 t-flex t-h-full t-w-full t-items-end t-justify-center pb-5">
        <button className="t-bg-[#fff] t-outline-0 t-absolute t-rounded-full t-p-[1rem] t-drop-shadow hover:t-bg-[#F4F4F4] active:t-bg-[#DFDFDF]">
          <Plus size={60} className="t-text-[#098DED]" />
        </button>
      </div>
      
      {/* post content */}
      <div id="gallery" >
        {images.map((image, index) => (
          <img src={image.src} className='img-responsive' />
        ))}
      </div>
    </div>
  )
}

export default NewFeed
