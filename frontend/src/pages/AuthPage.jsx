import React from 'react'
import LoginPage from './LoginPage'

import SignupPage from './SignupPage'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
const AuthPage = () => {
  const authScreenState =useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  return (
    <>
      {authScreenState === "login" ? <LoginPage /> : <SignupPage />}
    </>
  )
}

export default AuthPage
