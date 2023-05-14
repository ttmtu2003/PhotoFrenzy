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

  return (
    <div className={cls("p-3", className)}>
      {/* no posts */}
      {posts.length <= 0 && (
        <div className="t-w-[100vw] t-h-[20rem] t-flex t-justify-center t-items-center">
          <h1 className="t-font-semibold t-text-[#BEBEBE]">There is no post yet</h1>
        </div>
      )}
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
