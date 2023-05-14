import React from 'react'
import FavoriteIcon from "@material-ui/icons/Favorite";
// hook
import useLikePost from './hooks/useLikePost';

const Like = ({ postId, userId }) => {
  userId = window.localStorage.getItem('id');
  
  const { likePost, unlikePost, isLiked, totalLikes, setTotalLikes, setIsLiked } = useLikePost(postId, userId);

  // handle like logic
  const handleClick = async () => {
    if (isLiked) {
      const res = await unlikePost();
      setTotalLikes((prev) => prev-1)
      setIsLiked((prev) => !prev)
    } else {
      const res = await likePost();
      setTotalLikes((prev) => prev+1)
      setIsLiked((prev) => !prev)
    }
  }

  return (
    <div className='t-flex t-flex-col t-w-full t-items-center'>
      <FavoriteIcon data-testid='like-button' className={`hover:t-cursor-pointer ${isLiked ? 't-text-red-500' : ''}`} onClick={handleClick} />
      <p data-testid='total-likes'>{totalLikes}</p>
    </div>
  )
};

export default Like;