module.exports =
{
    add2BlockList,
    tokenInBlockList
    // ...
}

require('dotenv').config()

const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT)

/**
 *Agrega el token a redis por un tiempo, se espera que el tiempo sea el mismo que la duracion del token
 *
 * @param {*} token
 * @param {*} time
 */
function add2BlockList(token, time) {
    client.setex(token,time,'blocked');
}

/**
 *se valida si el token se encuentra almacenado en redis lo que indicatia que esta bloqueado
 *
 * @param {*} token
 * @return {*} 
 */
function tokenInBlockList(token) {
    return new Promise(resolve => {
        client.get(token, (err, data) => {
            if(err) resolve(false); 
            if(data !== null){
                resolve(true);
            } else{
                resolve(false);   
            }       
        });
        
    });
    
}