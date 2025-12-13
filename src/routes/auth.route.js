const express = require('express');
const router = express.Router();
const User = require('../Models/user.model');
const session = require('express-session');
const { sendOTP } = require('../utils/mailer');


router.get('/test', (req, res) => {
  res.send('working');
});

router.post("/generate-otp", async (req, res) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
    const { email } = req.body;
    req.session.otp = otp;
    req.session.email = email;

    sendOTP(email, otp)
      .then(() => {
        res.status(200).json({ message: "OTP sent successfully", otp: otp });
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
      });
});

router.post("/verify-otp", async (req, res) => {
    const { email, otp, name,mobile,password,address,role } = req.body;
    if (req.session.otp && req.session.email) {
        if (parseInt(otp) === req.session.otp && email === req.session.email) {
            // OTP is valid, create or authenticate user
            let user = await User.findOne({ email: email });
            if (!user) {
                // Create new user
                user = new User({ name, mobile, email, password, address, role });
                await user.save();
            } 
          }
    } else {
        return res.status(400).json({ message: "Invalid OTP or email" });
    }
})

router.get("/login", (req, res) => {
    res.render("login");
});



module.exports = router;