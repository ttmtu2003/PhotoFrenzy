import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Row } from 'reactstrap'
// hooks
import signupUser from '../../hooks/useSignUp'

const SignupForm = ( { className } ) => {
  
  const [ fullName, setFullName ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState("")

  // -- router --
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();  
    await signupUser(fullName, username, password)
    history.push('/')
  }

  return (
    <div className="mt-3 t-w-fit t-font-light">
      <Form onSubmit={handleSubmit} className="t-flex t-justify-between t-flex-col">
      {/* Error message */}
      <Row>
        {error && <div className="t-mb-1 ml-3 t-text-red-500">{error}</div>}
      </Row>

       {/* full name */}
       <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Input 
            className="t-px-2 t-bg-[#FFF] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-primary-300 focus:!t-shadow-none"
            id="auth-name"
            type="text"
            placeholder='Full name'
            ref={null}
            onChange={e => setFullName(e.target.value)}
          />
        </FormGroup>

        {/* username */}
        <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Input 
            className="t-px-2 t-bg-[#FFF] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-primary-300 focus:!t-shadow-none"
            id="auth-username"
            type="text"
            placeholder='Username'
            required
            ref={null}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>

        {/* password */}
        <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Input 
            className="t-px-2 t-bg-[#FFFF] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
            id="auth-password"
            required
            placeholder='Password'
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" className="hover:t-cursor-pointer hover:t-bg-[#519bc3] t-w-full t-py-[10px] t-px-[20px] t-my-[0.6em] t-bg-[#64BCED] t-text-white t-font-bold t-rounded-md t-border-none">
          Signup
        </Button>

        <div className="t-my-[0.6em]">
          Already have an account? 
          <Link to="/" className='t-text-blue-500 t-underline'> Sign in instead</Link>
        </div>

      </Form>
    </div>
  )
}

export default SignupForm