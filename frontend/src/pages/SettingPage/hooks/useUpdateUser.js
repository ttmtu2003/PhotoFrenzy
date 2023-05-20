import { useState } from 'react';
import axios from 'axios';

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (username, password, userId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put('/user-detail', { username, password, userId });
      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateUser };
};

export default useUpdateUser;