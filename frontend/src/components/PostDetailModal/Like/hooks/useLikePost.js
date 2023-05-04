import { useState, useEffect } from 'react';
import axios from 'axios';

const useLikePost = (postId, userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // get user like status of post
  useEffect(() => {
    axios.get(`/posts/${postId}/likes?user_id=${userId}`)
      .then(response => {
        setIsLiked(response.data.length > 0);
      })
      .catch(error => {
        console.log(error);
      });
  }, [postId, userId]);

  // like post
  const likePost = () => {
    setIsLoading(true);
    axios.post(`/posts/${postId}/likes`, { user_id: userId })
      .then(response => {
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

  return { likePost, unlikePost, isLoading, error, isLiked };
};

export default useLikePost;