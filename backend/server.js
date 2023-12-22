require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500
const dotenv = require("dotenv");

dotenv.config();

connectDB()

app.use(cors())

app.use(express.json())

app.use('/users', require('./routes/userRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/newsletter', require('./routes/newsletterRoute'))


app.listen(PORT, () => console.log("Server is live on " + PORT));
