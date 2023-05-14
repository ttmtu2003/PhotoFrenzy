import { useState } from 'react';
import axios from 'axios';

const usePostPhoto = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postPhoto = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(response.data);
      setIsLoading(false);
      window.location.href = '/profile'
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, postPhoto };
};

export default usePostPhoto;