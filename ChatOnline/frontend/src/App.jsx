import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './assets/Login'
import Signup from './assets/Signup'
import Home from './assets/Home'
import ForgotPassword from "./assets/ForgotPassword"
import VerifyOTP from "./assets/VerifyOTP"
import ResetPassword from "./assets/ResetPassword"
import EmailVerification from './assets/EmailVerification'
import VerifySuccess from './assets/VerifySuccess'
import SignupOTP from './assets/SignupOTP'



export default function App() {
  return (
    <BrowserRouter>
             <Routes>
                  <Route path="/" element = {<Login/>}/>
                   <Route path="/signup" element={<Signup/>}/>
                   <Route path="/home" element={<Home/>}/>
                   <Route path="/forgetpassword" element={<ForgotPassword/>}/>
                   <Route path="/verifyotp" element={<VerifyOTP/>}/>
                   <Route path="reset-password/" element={<ResetPassword/>}/>
                  <Route path="/verify-email" element={<EmailVerification />} />
                  <Route path="/verify-success" element={<VerifySuccess/>} />                 
                   <Route path="/verify-signup-otp" element={<SignupOTP />} />
             </Routes>
      </BrowserRouter>
  )
}
