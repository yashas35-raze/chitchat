

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/User')

// ─────────────────────────────────────────
// EMAIL TRANSPORTER
// ─────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// temporary OTP storage (in memory)
const otpStore = {}

// ─────────────────────────────────────────
// SIGNUP
// ─────────────────────────────────────────
router.post('/signup', async function (req, res) {
  try {
    const { fullName, email, password } = req.body

    // check if user already exists
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already  exists' })
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10)

    // save new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    })
    await newUser.save()

    // create token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token: token, user: { fullName, email } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body

    // check if user exists
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ message: 'User not found! Please sign up' })
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password!' })
    }

    // create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({ token: token, user: { fullName: user.fullName, email } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─────────────────────────────────────────
// FORGOT PASSWORD - sends OTP to email
// ─────────────────────────────────────────
router.post('/forgetpassword', async function (req, res) {
  try {
    const { email } = req.body

    // check if user exists in MongoDB
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ message: 'No account found with this email!' })
    }

    // generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // save OTP with expiry (10 minutes)
    otpStore[email] = {
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    }

    // send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your CONNECTO Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 32px; background: #f0f7ff; border-radius: 16px;">
          <h2 style="color: #2d7bbf; text-align: center;">CONNECTO</h2>
          <h3 style="color: #1a3a5c; text-align: center;">Password Reset OTP</h3>
          <p style="color: #6b8caa; text-align: center;">Use the OTP below to reset your password.</p>
          <div style="text-align: center; margin: 24px 0;">
            <span style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #3a8fd8; background: white; padding: 16px 28px; border-radius: 12px; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p style="color: #6b8caa; text-align: center; font-size: 13px;">
            This OTP expires in <strong>10 minutes</strong>.
          </p>
          <p style="color: #aaa; text-align: center; font-size: 12px;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    })

    res.status(200).json({ message: 'OTP sent to your email!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─────────────────────────────────────────
// VERIFY OTP
// ─────────────────────────────────────────
router.post('/verifyotp', async function (req, res) {
  try {
    const { email, otp } = req.body

    // check if OTP exists
    const stored = otpStore[email]
    if (!stored) {
      return res.status(400).json({ message: 'OTP not found! Please request a new one.' })
    }

    // check if OTP expired
    if (Date.now() > stored.expiresAt) {
      delete otpStore[email]
      return res.status(400).json({ message: 'OTP expired! Please request a new one.' })
    }

    // check if OTP matches
    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP! Please try again.' })
    }

    res.status(200).json({ message: 'OTP verified successfully!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─────────────────────────────────────────
// RESET PASSWORD
// ─────────────────────────────────────────
router.post('/resetpassword', async function (req, res) {
  try {
    const { email, otp, newPassword } = req.body

    // verify OTP again for security
    const stored = otpStore[email]
    if (!stored) {
      return res.status(400).json({ message: 'OTP not found! Please request a new one.' })
    }

    if (Date.now() > stored.expiresAt) {
      delete otpStore[email]
      return res.status(400).json({ message: 'OTP expired! Please request a new one.' })
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP!' })
    }

    // encrypt new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // update password in MongoDB
    await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    )

    // delete OTP from store
    delete otpStore[email]

    res.status(200).json({ message: 'Password reset successfully!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router