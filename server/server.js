const express = require("express");
const dotenv = require("dotenv");
const connectdb = require('./config/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const port = 8080;
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Router

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/event', require('./routes/event'))




app.listen(port,function(err){
    console.log("Server Started on port: 8080")
    connectdb();
})
