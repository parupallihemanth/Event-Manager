const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
 
const connectDB = require('./config/db')
const app = express();
var path = require('path');

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');

dotenv.config({path: './config/.env' })
connectDB();

// Express middlewares
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/event', eventRoutes);




// Assigning ports
const PORT = process.env.PORT || 4001
app.listen(PORT, () =>{
    console.log(`Server connected to ${PORT}`);
})