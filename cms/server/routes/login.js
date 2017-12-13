const express = require('express');
const router = express.Router();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportConfig = require('../passport/passport-strategy')(passport, Strategy);
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/', 
    passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    const token = jwt.sign({
        id: req.user._id,
        username: req.user.username,
        admin: req.user.isAdmin
    }, config.jwtSecret);
    
    res.json({'token': token, 'admin': req.user.isAdmin});
});








module.exports = router;

