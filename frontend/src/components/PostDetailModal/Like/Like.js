import React, { useState } from 'react'
import FavoriteIcon from "@material-ui/icons/Favorite";
import useLikePost from './hooks/useLikePost';

const Like = ({ postId, userId }) => {
  // const { likePost, unlikePost, isLoading, error, isLiked } = useLikePost(postId, userId);

  const [isLiked, setIsLiked] = useState(false) // temp use

  const handleClick = () => {
    // likePost({ postId, userId })
    setIsLiked((prev) => !prev)
  }

  // handle like logic
  // const handleClick = () => {
    // if (isLiked) {
    //   unlikePost();
    // } else {
    //   likePost();
    // }
  // }

  return (
    <FavoriteIcon className={`hover:t-cursor-pointer ${isLiked ? 't-text-red-500' : ''}`} onClick={handleClick} />
  )
};

export default Like;