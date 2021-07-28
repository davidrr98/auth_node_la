var mqtt = require('mqtt')

require('dotenv').config()
const MQTT_HOST = process.env.MQTT_HOST || 'mqtt://mqtt.lyaelectronic.com:4010';
var client  = mqtt.connect(MQTT_HOST)
var clientConnect = false;

client.on('connect',  clienteOn);
client.on('disconnect', clienteOff);
client.on('reconnect', clienteOn);


function clienteOn(){
  clientConnect=true;
  console.log("Conexion exitosa a mqtt");
}
function clienteOff(){
  clientConnect=false;
  console.log("Se desctonecto mqtt");
}



const sendMessage = (req, res) => {
  if(clientConnect){
    const { message } = req.body;
    if(message==null || message== ""){
      res.json({
        status:"Mensaje no enviado, recuerda que el campo message es obligatorio"
      })
      return;
    }
    const id = req.user.id || 0;
    client.publish('david', `{"message":"${message}","user":${id}}`);
    res.json({
      status:"Enviado de forma correcta"
    })
  }else{
    res.json({
      status:"Sin coneccion al cliente, intentalo nuevamente"
    })
  }  
}


module.exports =
{
  sendMessage
}
