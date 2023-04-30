import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
// hooks
import loginUser from '../../hooks/useLogin'

const LoginForm = ( { className } ) => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorMsg, setErrorMsg ] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const { data } = await loginUser(username, password)
    if(data.status === 'success'){
      window.location.href = '/explore'
      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('isAuthed', true)
    }
    else
      setErrorMsg(data.message)
  }

  
  return (
    <div className="mt-3 t-w-fit t-font-light">
      <Form onSubmit={handleSubmit} className="t-flex t-justify-between t-flex-col">
        
        {errorMsg && <div className="t-mb-1 t-text-red-500">{errorMsg}</div>}

        <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Label for="auth-username">
            Username
            <span className="t-text-red-500"> *</span>
          </Label>
          <Input 
            className="t-px-2 t-bg-[#FFFF] t-h-[1.8rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-primary-300 focus:!t-shadow-none"
            id="auth-username"
            type="text"
            autoFocus
            required
            ref={null}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="t-flex t-flex-col my-[0.6rem]">
          <Label for="auth-password">
            Password
            <span className="t-text-red-500"> *</span>
          </Label>
          <Input 
            className="t-px-2 t-bg-[#FFFF] t-h-[1.8rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-primary-300 focus:!t-shadow-none"
            type="password"
            id="auth-password"
            required
            ref={null}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" className="hover:t-cursor-pointer hover:t-bg-[#519bc3] t-w-full t-py-[10px] t-px-[20px] t-my-[0.6em] t-bg-[#64BCED] t-text-white t-font-bold t-rounded-md t-border-none">
          Login
        </Button>

        <div className="mt-3 mx-3">
          <div className="t-flex">
            <div className="t-top-[0.75em] t-shrink t-h-[1px] t-relative t-grow t-bg-neutral-300"></div>
            <div className="t-relative t-text-neutral-300 mx-3 t-align-baseline">OR</div>
            <div className="t-top-[0.75em] t-shrink t-h-[1px] t-relative t-grow t-bg-neutral-300"></div>
          </div>
        </div>  

        {/* Google login */}
        

        <div className="t-my-[0.6em]">
          New to our platform? 
          <Link to="/register" className='t-text-blue-500 t-underline'> Register an account</Link>
        </div>

      </Form>
    </div>
  )
}

export default LoginForm