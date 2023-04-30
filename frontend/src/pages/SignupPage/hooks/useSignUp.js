import axios from "axios"

export async function signupUser(fullName, username, password) {
  let status
  await axios.post('/signup', {
      crossDomain: true,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: {
        fullName,
        username,
        password,
        
      }
    })
    .then((res) => status = res.data )
    return status
}
