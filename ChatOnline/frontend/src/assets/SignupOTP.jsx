import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignupOTP() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const email = localStorage.getItem('signupEmail')

  const handleVerify = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/verify-signup-otp', {
        email,
        otp
      })

      alert('Account verified successfully!')
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP')
    }
  }

  const handleResend = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/resend-signup-otp', {
        email
      })
      alert('OTP resent!')
    } catch (err) {
      setError('Failed to resend OTP')
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Verify Your Email</h2>
      <p>Enter the OTP sent to your email</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ padding: '10px', width: '200px' }}
      />

      <br /><br />

      <button onClick={handleVerify} style={{ padding: '10px 20px' }}>
        Verify OTP
      </button>

      <br /><br />

      <button onClick={handleResend} style={{ padding: '8px 15px' }}>
        Resend OTP
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default SignupOTP