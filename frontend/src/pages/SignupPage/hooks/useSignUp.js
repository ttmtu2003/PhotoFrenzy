import axios from "axios"

export async function signupUser(username, email, password, passwordRepeat) {
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
        username,
        email,
        password,
        passwordRepeat
      }
    })
    .then((res) => status = res.data )
    return status
}
