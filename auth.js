module.exports =
{
    generateAccessToken,
    validateToken

    // ...
}
require('dotenv').config()
const jwt = require('jsonwebtoken');

// Implementation ----------------------------------

function generateAccessToken(user) {
    console.log(user);
    return jwt.sign(user,process.env.SECRET_JWT, {expiresIn: '60m'});
}

function validateToken(req, res, next){
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.status(401).json({
        mensaje:"Faltan las credenciales de accesso"
    });

    jwt.verify(accessToken, process.env.SECRET_JWT, (err, user) =>{
        if(err){
            res.status(401).json({
                mensaje:"Token incorrecto"
            });
        }else{
            req.user= user;
            
            next();
        }

    });




}

