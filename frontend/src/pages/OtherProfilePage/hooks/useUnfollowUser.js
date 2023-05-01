import { useState } from 'react'
import axios from 'axios'

const useUnfollowUser = ({ userId, currUId }) => {

  async function unfollowUser() {
    try {
      // console.log("ID", userId)
      const res = await axios.post(`/unfollow?user_id=${userId}&curr_user_id=${currUId}`)
        console.log("UNFOLOW", res)
        return res

    } catch (error) {
      
      return error
    }
  }

  return { unfollowUser }
}

export default useUnfollowUser