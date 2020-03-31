const express = require('express')
const app = express();
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 8000

// allow cors requests
app.use(cors());

// http logging middleware
app.use(morgan('dev'))

// bodyparsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// static middleware
app.use(express.static(path.join(__dirname, 'public')))

// routes

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})


app.listen(PORT, () => console.log('Server runnning at port ' + PORT))
