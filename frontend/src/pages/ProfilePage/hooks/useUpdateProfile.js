import axios from "axios"
import { useState } from "react"

const useUpdateProfile = ({ userId }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateProfile = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.put(`/profile?user_id=${userId}`, data)
      return response.data
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return { loading, error, updateProfile }
}

export default useUpdateProfile