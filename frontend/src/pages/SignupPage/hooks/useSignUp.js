import axios from "axios"

const signupUser = (fullName, username, password) => {
  return axios.post('/signup', {
    body: {
      fullName,
      username,
      password,
      
    }
  })
  .then((res) => {
    return res.data
  })
}

export default signupUser
