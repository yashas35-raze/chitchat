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
    user: "yashasuputhran35@gmail.com",
    pass: "edeyewequbxwyggy",
  },
})

// temporary OTP storage (in memory)
const otpStore = {}

// ─────────────────────────────────────────
// SIGNUP + SEND VERIFICATION EMAIL
// ─────────────────────────────────────────
router.post('/signup', async function (req, res) {
  try {
    const { fullName, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    // ✅ CORRECT PLACE
    const info = await transporter.sendMail({
      from: "yashasuputhran35@gmail.com",
      to: "yashasuputhran35@gmail.com",
      subject: "Test Email",
      text: "Testing email"
    })

    console.log("✅ SUCCESS:", info.response)

    res.status(201).json({ message: 'Signup successful' })

  } catch (err) {
    console.log("❌ ERROR:", err)
    res.status(500).json({ message: err.message })
  }
})
// ─────────────────────────────────────────
// VERIFY EMAIL
// ─────────────────────────────────────────
router.get('/verify/:token', async function (req, res) {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(400).send('Invalid user')
    }

    user.isVerified = true
    await user.save()

    res.send('✅ Email verified successfully! You can now login.')
  } catch (err) {
    res.status(400).send('❌ Invalid or expired token')
  }
})


// ─────────────────────────────────────────
// LOGIN (only if verified)
// ─────────────────────────────────────────
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      token,
      user: { fullName: user.fullName, email },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// ─────────────────────────────────────────
// FORGOT PASSWORD (OTP)
// ─────────────────────────────────────────
router.post('/forgetpassword', async function (req, res) {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'No account found' })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'CONNECTO OTP',
      html: `<h2>Your OTP: ${otp}</h2>`,
    })

    res.status(200).json({ message: 'OTP sent' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// ─────────────────────────────────────────
// VERIFY OTP
// ─────────────────────────────────────────
router.post('/verifyotp', async function (req, res) {
  const { email, otp } = req.body

  const stored = otpStore[email]
  if (!stored) {
    return res.status(400).json({ message: 'OTP not found' })
  }

  if (Date.now() > stored.expiresAt) {
    delete otpStore[email]
    return res.status(400).json({ message: 'OTP expired' })
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' })
  }

  res.status(200).json({ message: 'OTP verified' })
})


// ─────────────────────────────────────────
// RESET PASSWORD
// ─────────────────────────────────────────
router.post('/resetpassword', async function (req, res) {
  const { email, otp, newPassword } = req.body

  const stored = otpStore[email]
  if (!stored || stored.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await User.findOneAndUpdate({ email }, { password: hashedPassword })

  delete otpStore[email]

  res.status(200).json({ message: 'Password reset successful' })
})

module.exports = router