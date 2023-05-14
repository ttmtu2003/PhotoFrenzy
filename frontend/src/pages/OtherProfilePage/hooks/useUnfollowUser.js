import { useState } from 'react'
import axios from 'axios'

const useUnfollowUser = ({ userId, currUId }) => {

  async function unfollowUser() {
    try {
      const res = await axios.post(`/unfollow?user_id=${userId}&curr_user_id=${currUId}`)
        return res

    } catch (error) {
      
      return error
    }
  }

  return { unfollowUser }
}

export default useUnfollowUser