const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Connecting to database
require('./dbConnection');

const port = process.env.PORT;

//handling routes
app.use('/', require('./routes/authRoutes')); 
app.use('/code', require('./routes/codeRoutes'));   

app.listen(port, () =>  {
    console.log(`Listening to port ${port} `);
})
 