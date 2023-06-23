const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const schema = mongoose.Schema


const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})


//user signup
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error('All fields are required')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is invalid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already exists')
  }

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hashedPassword })
  return user
}


//user login
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error('All fields are required')
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
  const auth = await bcrypt.compare(password, user.password)

  if (!auth) {
    throw Error('Incorrect password')
  }
  return user

}

module.exports = mongoose.model('User', userSchema)