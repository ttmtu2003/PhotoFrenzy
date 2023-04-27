import React from 'react'
import { Card, CardBody } from 'reactstrap'
import LoginForm from './components/LoginForm/LoginForm'

const LoginPage = ({ className }) => {

  return (
    <Card className="t-absolute md:t--translate-y-2/4 md:t--translate-x-2/4 t-top-1/4 md:t-top-2/4 md:t-left-2/4 t-bg-[#F4F4F4] w-fit t-py-[2rem] t-left-[20px] md:t-p-[2rem] t-rounded-md">
      <CardBody>
        <h2 className="logo">PhotoFrenzy</h2>
        <LoginForm />
      </CardBody>
    </Card>
  )
}

export default LoginPage