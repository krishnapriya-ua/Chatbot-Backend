const express=require('express')
const cors = require('cors')
const chatRoute = require('./routes/chatRoute')
require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())

app.use('/api',chatRoute)
 

const PORT=process.env.BACKEND_PORT
app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})