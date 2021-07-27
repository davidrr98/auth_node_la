const express = require('express');
const router = express.Router();

const auth= require("../auth")

router.get('/',auth.validateToken, (req, res)=>{
    res.send("USERS");
})

module.exports = router;