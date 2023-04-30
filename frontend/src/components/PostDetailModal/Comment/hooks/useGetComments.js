import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`);
        setComments(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    getComments();
  }, [postId]);

  return { comments, isLoading, error };
};

export default useGetComments;