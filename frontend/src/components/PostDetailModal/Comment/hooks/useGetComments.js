import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // get all comments
  const getComments = async () => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      setComments(response.data.reverse())
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getComments()
  }, [postId])

  return { comments, setComments, error, isLoading,  };
};

export default useGetComments;