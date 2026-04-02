const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')


console.log('EMAIL:', process.env.EMAIL)
console.log('PASSWORD:', process.env.EMAIL_PASSWORD)

const app = express()


//middlewares
app.use(cors())
app.use(express.json())


app.use('/api/auth',authRoutes)


//test route

app.get('/',function(req,res){
        res.send('api is running....')

})

//conncet to mongodb
mongoose.connect(process.env.MONGO_URI)
      .then(function(){

        console.log("MOngodb Connected")

        app.listen(process.env.PORT,function(){

            console.log("Server running on port "+process.env.PORT)
        })
      })
      .catch(function(err){

        console.log(err)
      })