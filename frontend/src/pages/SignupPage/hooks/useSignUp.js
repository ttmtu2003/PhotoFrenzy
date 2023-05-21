import axios from "axios"
import { useState } from "react"

const useSignUp = () => {
  const [error, setError] = useState(null);

  const signupUser = async (fullName, username, password) => {
    setError(null);
    try {
      const response = await axios.post('/signup', {
      body: {
        fullName,
        username,
        password,
        
      }
    })
      return response.data
    }
    catch(error) {
      setError(error.message)
    }
  }
  return { signupUser, error, setError }
}


export default useSignUp
