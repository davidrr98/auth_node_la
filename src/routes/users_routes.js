const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: false}));
router.use(express.json());

const { getUserById, deleteUserById, updateUserById , newUser, activeById } = require('../models/user')

const auth= require("../auth/auth")

router.get('/:id', auth.validateToken, getUserById);

router.delete('/:id', auth.validateToken, deleteUserById);

router.put('/:id', auth.validateToken, updateUserById);

router.patch('/:id/active', auth.validateToken, activeById);

router.post('/', newUser)

module.exports = router;