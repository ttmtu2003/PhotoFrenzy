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
      setComments(response.data)
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getComments()
  }, [postId])

  return { comments, setComments, error, isLoading,  };
};

export default useGetComments;