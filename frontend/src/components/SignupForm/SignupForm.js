import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
// api fnc
import { signupUser } from '../../APIFunctions/Auth'

const SignupForm = ( className ) => {
  
  const [ fullName, setFullName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ pwRepeat, setPwRepeat ] = useState("")
  const [ error, setError ] = useState("")

  // -- router --
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();  
    history.push('/')
  }

  return (
    <div className="mt-3 t-w-fit t-font-light">
      <CardTitle className="t-font-semibold t-mb-[1.4rem]">
        Register a PhotoFrenzy account
      </CardTitle>

      <Form onSubmit={handleSubmit} className="t-flex t-justify-between t-flex-col">
      {/* Error message */}
      <Row>
        {error && <div className="t-mb-1 ml-3 t-text-red-500">{error}</div>}
      </Row>

       {/* <Row xs={2}>
        <Col>
          <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]"> */}
            {/* First name */}
            {/* <Label for="auth-firstName">
                First Name
              </Label>
              <Input 
                className="t-px-2 t-bg-[#F2F0ED] t-h-[1.8rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
                id="auth-firstName"
                autoFocus
                type="text"
                ref={null}
                onChange={e => setFirstName(e.target.value)}
              />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]"> */}
            {/* Last name */}
            {/* <Label for="auth-lastName">
                Last Name
              </Label>
              <Input 
                className="t-px-2 t-bg-[#F2F0ED] t-h-[1.8rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
                id="auth-lastName"
                type="text"
                ref={null}
                onChange={e => setLastName(e.target.value)}
              />
          </FormGroup>
        </Col>
       </Row> */}

       {/* full name */}
       <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Input 
            className="t-px-2 t-bg-[#F2F0ED] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
            id="auth-name"
            type="text"
            placeholder='Full name'
            ref={null}
            onChange={e => setFullName(e.target.value)}
          />
        </FormGroup>


        {/* email */}
       <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Input 
            className="t-px-2 t-bg-[#F2F0ED] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
            id="auth-username"
            placeholder='Email'
            type="text"
            required
            ref={null}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>

        {/* username */}
        <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Input 
            className="t-px-2 t-bg-[#F2F0ED] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
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
            className="t-px-2 t-bg-[#F2F0ED] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
            id="auth-password"
            required
            placeholder='Password'
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>

        {/* password repeat */}
        <FormGroup className="t-flex t-flex-col t-mb-[0.6rem]">
          <Input 
            className="t-px-2 t-bg-[#F2F0ED] t-h-[2.5rem] t-border-0 t-rounded mt-[0.5em] focus:t-border-[1px] focus:t-outline-none focus:t-border-orange-300 focus:!t-shadow-none"
            id="auth-pwRepeat"
            required
            placeholder='Re-enter password'
            type="password"
            onChange={e => setPwRepeat(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" className="hover:t-cursor-pointer hover:t-bg-[#ac8010] t-w-full t-py-[10px] t-px-[20px] t-my-[0.6em] t-bg-[#C7930E] t-text-white t-font-bold t-rounded-sm t-border-none">
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