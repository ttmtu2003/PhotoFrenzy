import { useState, useEffect } from 'react';
import axios from 'axios';

const useLikePost = (postId, userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  //testing
  const [myInteger, testinglikes] = useState(null);;

  // get user like status of post
  useEffect(() => {
    const response = axios.get(`/posts/${postId}/likes?user_id=${userId}`)
      .then(response => {
        const [ totalLikes, isLiked ] = response.data
        setIsLiked(isLiked.status_like);
        testinglikes(response.data['total_likes']);
        console.log("TOTAL LIKES IS HERE: ",response.data['total_likes']);
        console.log(response)
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

  return { likePost, unlikePost, isLoading, error, isLiked, myInteger};
};

export default useLikePost;