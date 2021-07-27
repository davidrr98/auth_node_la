module.exports =
{
    generateAccessToken,
    deleteAccessToken,
    validateToken

    // ...
}
require('dotenv').config()

const block_list= require("./block_list.js")
const jwt = require('jsonwebtoken');
const timeToken = 60
// Implementation ----------------------------------

function generateAccessToken(user) {
    console.log(user);
    return jwt.sign(user,process.env.SECRET_JWT, {expiresIn: timeToken+'m'});
}

function deleteAccessToken(req) {
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.status(401).json({
        mensaje:"Faltan las credenciales de accesso"
    });

    block_list.add2BlockList(accessToken,timeToken*60);
}

async function validateToken(req, res, next){
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.status(401).json({
        mensaje:"Faltan las credenciales de accesso"
    });
    const bloqueado=await block_list.tokenInBlockList(accessToken);
    
    if(bloqueado){
        console.log('Bloqueado');
        res.status(401).json({
            mensaje:"Token eliminado"
        });
    } else{
        console.log('Sin bloquear');
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


    




}

