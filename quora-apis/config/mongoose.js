const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/quora_db');
const db= mongoose.connection;

//error
db.on('error', console.error.bind(console, 'Oops! An error occured while connecting to the database!'));

//up and running
db.once('open', function(){
    console.log('Database successfully connected!');
});

module.exports= db;