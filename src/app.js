require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.route');

const connectDB = require('./db/db');
connectDB();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

module.exports = app;