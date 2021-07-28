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
const SECRET_JWT = process.env.SECRET_JWT || "secretejwt"
// Implementation ----------------------------------


/**
 *Crea el access token
 *
 * @param {*} user
 * @return {*} 
 */
function generateAccessToken(user) {
    console.log("Entra a generate");
    console.log(user);


    return jwt.sign(user,SECRET_JWT, {expiresIn: timeToken+'m'});
}

/**
 *Agrega el token a la lista de bloqueo
 *
 * @param {*} req
 */
function deleteAccessToken(req) {
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.status(401).json({
        mensaje:"Faltan las credenciales de accesso"
    });

    block_list.add2BlockList(accessToken,timeToken*60);
}

/**
 *valida si el token es valido
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function validateToken(req, res, next){
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.status(401).json({
        mensaje:"Faltan las credenciales de accesso"
    });
    const bloqueado=await block_list.tokenInBlockList(accessToken);
    
    if(bloqueado){
        res.status(401).json({
            mensaje:"Token eliminado"
        });
    } else{
        jwt.verify(accessToken, SECRET_JWT, (err, user) =>{
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

