const express = require('express');
const router = express.Router();
const auth = require("../auth");
const { userValidate } = require('../models/user')

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/send', auth.validateToken , async (req, res) => {
    const {message, user}= req.body;
    console.log(message, user);

    res.send("send :V");

    
});

module.exports = router;