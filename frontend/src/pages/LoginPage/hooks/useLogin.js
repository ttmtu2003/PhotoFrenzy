import axios from 'axios'

async function loginUser(username, password) {
  return await axios.post(`/login`, { 
    crossDomain: true,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    body: { username: username, password: password } })
  .then( res => {
    const { data, status } = res
    return { data, status }
  })
  .catch(console.error)
}

export default loginUser