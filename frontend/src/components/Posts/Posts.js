import React from "react"
import './style.scss'
import cls from 'classnames'
import { Thumbnail } from "./Thumbnail"

const Posts = ({ className, images }) => {
  return (
    <div className={cls("p-3", className)}>
      {/* post content */}
      <div id="gallery" >
        {images.map((image, index) => (
          <Thumbnail key={index} image={image} className='img-responsive' />
        ))}
      </div>
    </div>
  )
}

export default Posts
