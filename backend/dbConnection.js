const mongoose = require('mongoose');

let dbConnect = mongoose.connect(process.env.CONNECTION_STRING)
                    .then(()=> {
                    console.log('Database is connected') })
                    .catch((err) => console.log("ERROR in Database connection: ", err))

                    
module.exports = dbConnect; 