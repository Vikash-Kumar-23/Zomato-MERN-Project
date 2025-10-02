require('dotenv').config();
//start server
const app = require('./src/app');
//connect to database
const connectDB = require('./src/db/db');
const port = 3000;
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});