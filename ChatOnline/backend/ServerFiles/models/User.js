const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false    // ← false until email is verified
  },
  verificationToken: {
    type: String,     // ← stores the token we send in email
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
