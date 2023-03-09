import axios from 'axios'

export async function loginUser(username, password) {
  return await axios.post(`http://localhost:5000/login`, { 
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

export async function signupUser(username, email, password, passwordRepeat) {
  let status
  await axios.post('http://localhost:5000/signup', {
      crossDomain: true,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: {
        username,
        email,
        password,
        passwordRepeat
      }
    })
    .then((res) => status = res.data )
    return status
}
