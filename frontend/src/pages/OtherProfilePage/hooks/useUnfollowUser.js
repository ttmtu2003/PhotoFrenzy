import { useState } from 'react'
import axios from 'axios'

const useUnfollowUser = ({ userId, currUId }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function unfollowUser() {
    try {
      const res = await axios.post(`/unfollow?user_id=${userId}&curr_user_id=${currUId}`)
        return res

    } catch (error) {
      setErrorMsg(error.response.data.error);
      setIsLoading(false);
      return error
    }
  }

  return { errorMsg, isLoading, unfollowUser }
}

export default useUnfollowUser