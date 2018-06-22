require('dotenv').config();

const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  axios = require('axios'),
  PORT = 3000

//builds an object that can make http requests from inside out code
const apiClient = axios.create()

app.use(express.static('public'));


app.get('/', (req,res) => {
    res.sendFile(__dirname+'/views/index.html');
})


app.listen(PORT, (err) => {
    console.log(err || `Server running on ${PORT} :)`)
  });