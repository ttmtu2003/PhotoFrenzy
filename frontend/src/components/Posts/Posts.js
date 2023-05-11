import React, { useState } from "react"
import './style.scss'
import cls from 'classnames'
import Thumbnail from "./Thumbnail"
import PostDetailModal from "../PostDetailModal/PostDetailModal"


const Posts = ({ className, posts }) => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null)

  const handlePostClick = (post) => {
    setOpen(true)
    setSelectedPost(post)
  }

  const handleModalCancel = () => {
    setSelectedPost(null)
    setOpen(false)
  }

  console.log("selectpost: ",selectedPost);
  
  return (
    <div className={cls("p-3", className)}>
      {/* post content */}
      <div id="gallery" >
        {posts.map((post, index) => (
            <div onClick={() => handlePostClick(post)}>
              <Thumbnail key={index} post={post} className='hover:t-cursor-pointer hover:t-shadow-lg  img-responsive' />
            </div>
        ))}

        {selectedPost !== null && <PostDetailModal className="mt-3" post={selectedPost} open={open} onClose={handleModalCancel} />}
      </div>
    </div>
  )
}

export default Posts
