import axios from 'axios'

export async function loginUser(username, password) {
  return await axios.post(`/login1`, { 
    crossDomain: true,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    body: { username: username, password: password } })
  .then( res => {
    return res.data
  })
  .catch(console.error)
}

