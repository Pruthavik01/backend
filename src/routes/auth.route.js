const express = require('express');
const router = express.Router();
const User = require('../Models/user.model');

router.get('/test', (req, res) => {
  res.send('working');
});

router.post("/register", async (req, res) => {
    const {name, mobile, address, password, role} = req.body;
    const newUser =  await User.create({name, mobile, address, password, role});
    res.status(201).json({message: "User registered successfully", newUser});

});

module.exports = router;