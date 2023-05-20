import axios from 'axios'
import { useState } from 'react';

const useFollowUser = ({ userId, currUId }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function followUser() {
    try {
      const res = await axios.post(`/follow?user_id=${userId}&curr_user_id=${currUId}`)
        return res
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
  }

  return { error, isLoading, followUser }
}

export default useFollowUser