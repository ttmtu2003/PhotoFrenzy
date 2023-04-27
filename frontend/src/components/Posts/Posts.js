import React from "react"
import './style.scss'
import { Thumbnail } from "./Thumbnail"

const Posts = ({ images }) => {
  return (
    <div className="p-3 t-mt-[4rem]">
      
      
      {/* post content */}
      <div id="gallery" >
        {images.map((image, index) => (
          <Thumbnail image={image} className='img-responsive' />
        ))}
      </div>
    </div>
  )
}

export default Posts
