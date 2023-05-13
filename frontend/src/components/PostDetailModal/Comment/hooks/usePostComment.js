import { useState } from 'react';
import axios from 'axios';

const usePostComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // post comment api call
  const postComment = async ({ postId, comment, userId }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        body: {comment, author_id: userId } })
      return response.data
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { postComment, isLoading, error };
};

export default usePostComment;


