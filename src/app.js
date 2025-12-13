require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.route');



const connectDB = require('./db/db');
const session = require('express-session');
connectDB();

const app = express();
app.use(session());
app.use(express.json());
app.use("/auth", authRoutes);

module.exports = app;