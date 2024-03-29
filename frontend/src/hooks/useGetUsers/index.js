import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetUsers = (searchQuery, userId) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/users', {
          params: {
            search: searchQuery,
            user_id: userId
          },
        })
        setUsers(response.data)
        setError(null)
      } catch (error) {     
          setError(error.message)
      }
    }

    fetchUsers()
  }, [searchQuery])

  return { users, error }
}

export default useGetUsers