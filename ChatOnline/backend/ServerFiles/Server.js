const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')



dotenv.config()

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