const express   = require('express');
const cors      = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app       = express();
const port      = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.URL;
mongoose.connect(url, {
    useNewUrlParser: true
  ,useUnifiedTopology:true
});

const connection = mongoose.connection;
connection.once('open' , () =>{
    console.log("MongoDB database conection established successfully");
})

const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exerciseRouter)
app.use('/users', usersRouter)

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})