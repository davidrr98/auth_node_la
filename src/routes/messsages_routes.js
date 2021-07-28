const express = require('express');
const router = express.Router();
const auth = require("../auth/auth");
const { sendMessage } = require("../controllers/mqtt_controller")
const { userValidate } = require('../models/user')

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/send', auth.validateToken , sendMessage);

module.exports = router;

