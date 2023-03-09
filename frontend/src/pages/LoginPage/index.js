import React from 'react'
import { Card, CardBody } from 'reactstrap'
import LoginForm from '../../components/LoginForm/LoginForm.js'

const LoginPage = ({ className }) => {

  return (
    <Card className="t-absolute t--translate-y-2/4 t-translate-x-1/4 t-top-1/4 t-top-2/4 t-left-2/4 bg-white w-fit t-py-[2rem] t-left-[20px] md:t-p-[2rem] t-rounded-md">
      <CardBody>
        <h2 className="logo">PhotoFrenzy</h2>
        <LoginForm />
      </CardBody>
    </Card>
  )
}

export default LoginPage