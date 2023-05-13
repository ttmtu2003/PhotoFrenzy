import { useState, useEffect } from 'react';
import axios from 'axios';

const useLikePost = (postId, userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(null);;

  // get total likes and like status
  useEffect(() => {
    const response = axios.get(`/posts/${postId}/likes?user_id=${userId}`)
      .then(response => {
        const { total_likes, status_like } = response.data
        setIsLiked(status_like);
        setTotalLikes(total_likes);

      })
      .catch(error => {
        console.log(error);
      });
  }, [postId, userId]);


  // like post
  const likePost = () => {
    setIsLoading(true);
    axios.post(`/posts/${postId}/likes`, { user_id: userId })
      .then(() => {
        setIsLoading(false);
        setIsLiked(true);
        setError(null);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  };

  // unlike post
  const unlikePost = () => {
    setIsLoading(true);
    axios.delete(`/posts/${postId}/likes?user_id=${userId}`)
      .then(response => {
        setIsLoading(false);
        setIsLiked(false);
        setError(null);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  };

  return { likePost, unlikePost, isLoading, error, isLiked, totalLikes, setTotalLikes, setIsLiked };
};

export default useLikePost;