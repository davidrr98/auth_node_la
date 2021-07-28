var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
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
/* function sendMessage(msg){
  console.log("Se va a enviar");
    client.on('connect', function () {
        client.subscribe('david', function (err) {
          if (!err) {
             client.publish('david', msg)
          }
        })
      })   
} */


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
    console.log("Se va a enviar");
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
