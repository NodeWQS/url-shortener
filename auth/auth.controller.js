const { hash, compare } = require('bcryptjs')
const { verify, sign } = require('jsonwebtoken')
const Customer = require('../models/customer')

module.exports = class AuthController{
    static async signup(req, res){
      try {
          const password = await hash(req.body.password, 10)
          const user = new Customer({
            ...req.body,
            password
          })

          await user.save()

          return res.status(201).json(user)
      } catch (error) {
          const errorname = error.message.search('username')
          
          switch (errorname) {
              case 66:
                return res.status(403).json({
                    msg: 'username already exists.'
                })
                break;
              default:
                return res.status(403).json({
                    msg: 'email already exists.'
                })
                break;
          }
      }
    }
    static async signin(req, res){
        try {
            const { email, password } = req.body
            const user = await Customer.findOne({ email })
            const compared = await compare(password, user.password)

            if (user && compared) {
                const token = sign({
                    id: user._id,
                    username: user.username,
                    email,
                }, process.env.TOKEN, { expiresIn: 60 * 60 * 24 * 10 })

                return res.status(200).json({
                    token
                })
            }
        } catch (error) {
            console.log(error.message);
            return res.status(401).json({
                msg: 'email or password is not correct.'
            })
        }
    }
    static verification(req,res){
      try {
          const verifedToken = verify(req.body.token, process.env.TOKEN)

          return res.status(200).json(verifedToken)
      } catch (error) {
          return res.status(404).json({
              msg: 'this token is not found.'
          })
      }
    }
}