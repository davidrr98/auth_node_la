const express = require('express');
const router = express.Router();
const auth= require("../auth");

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.delete('/', auth.validateToken, (req, res) => {
    auth.deleteAccessToken(req)
    res.status(200).json({
        status: 'logout'
    });

});


router.post('/', (req, res) => {
    const { username, password} = req.body;
    //consultar y validar
    const user = {username: username};
    const accessToken = auth.generateAccessToken(user);
    res.header('authorization', accessToken).json({
        messaje: 'Usuario autenticado',
        token: accessToken
    });
});

module.exports = router;