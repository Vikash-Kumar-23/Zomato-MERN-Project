const mongoose = require('mongoose');

//connect to database(mongodb)
function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err));
}

module.exports = connectDB;
