import axios from 'axios'

const useFollowUser = ({ userId, currUId }) => {

  async function followUser() {
    try {
      const res = await axios.post(`/follow?user_id=${userId}&curr_user_id=${currUId}`)
        // console.log("FOLOW", res)
        return res
    } catch (error) {
      return error
    }
  }

  return { followUser }
}

export default useFollowUser