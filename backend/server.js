const express = require('express');
require('dotenv').config();
var cors = require('cors')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) // to cors error 

//Connecting to database
require('./dbConnection');

const port = process.env.PORT;

//handling routes
app.use('/', require('./routes/authRoutes')); 
app.use('/code', require('./routes/codeRoutes'));   

app.listen(port, () =>  {
    console.log(`Listening to port ${port} `);
})
 