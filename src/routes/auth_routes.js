const express = require('express');
const router = express.Router();
const auth = require("../auth/auth");
const { userValidate } = require('../models/user')

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.delete('/', auth.validateToken, (req, res) => {
    auth.deleteAccessToken(req)
    res.status(200).json({
        status: 'logout'
    });

});


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if(username==null || username=="" ){
        res.json({
            mensaje: 'El campo username es obligatorio'
        });
        return;
    }

    if(password==null || password=="" ){
        res.json({
            mensaje: 'El campo password es obligatorio'
        });
        return;
    }
    
    const id =await userValidate(username, password);
    if (id != null) {
        const user = { id: id,
                    username: username };
        const accessToken = auth.generateAccessToken(user);
        res.header('authorization', accessToken).json({
            messaje: 'Usuario autenticado',
            token: accessToken
        });
    }else{
        res.json({
            mensaje: 'Credenciales incorrectas'
        });
    }

});

module.exports = router;