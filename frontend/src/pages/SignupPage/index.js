import React from 'react'
import { Card, CardBody } from 'reactstrap'
import SignupForm from '../../components/SignupForm/SignupForm'

const SignupPage = ( { className } ) => {

  return (
    <Card className="t-absolute t--translate-y-2/4 t--translate-x-2/4 t-top-1/4 t-top-2/4 t-left-2/4 bg-white w-fit t-py-[2rem] t-left-[10px] md:t-p-[2rem] t-rounded-md">
      <CardBody>
        <h2 className="logo">PhotoFrenzy</h2>
        <SignupForm />
      </CardBody>
    </Card>
  )
}

export default SignupPage