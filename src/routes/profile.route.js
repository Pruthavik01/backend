const express = require('express');
const router = express.Router();
const userModel = require('../Models/user.model');

router.post("/update-pass", async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await userModel.findById(userId).select('password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== oldPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        if (oldPassword === newPassword) {
            return res.status(400).json({ message: "New password must be different from old password" });
        }
        await userModel.findByIdAndUpdate(userId, { password: newPassword });
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error updating password" });
    }
});

router.post("/update-name", async (req, res) => {
    try {
        const { userId, newName } = req.body;
        const user = await userModel.findByIdAndUpdate(userId, { name: newName }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Name updated successfully", user });
    } catch (err) {
        return res.status(500).json({ message: "Error updating name" });
    }
});

module.exports = router;