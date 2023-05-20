import { useState } from 'react';
import axios from 'axios';

const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteUser = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/users/${userId}`);
      setIsDeleted(true);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { isLoading, error, isDeleted, deleteUser };
};

export default useDeleteUser;