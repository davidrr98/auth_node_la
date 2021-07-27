const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW || './';
const auth= require("./auth.js")

app.use(express.static(www));
console.log(`serving ${www}`);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/health_check', (req, res) => {
    res.status(200).json({
        status: 'OK'
    });
    
});

app.get('/jwt', auth.validateToken, (req, res) => {
    res.status(200).json({
        status: 'OK-token',
        user: req.user
    });

    
});

app.post('/authorization', (req, res) => {

    console.log(req.body);
    const { username, password} = req.body;
    
    //consultar y validar
    const user = {username: username};

    const accessToken = auth.generateAccessToken(user);
    res.header('authorization', accessToken).json({
        messaje: 'Usuario autenticado',
        token: accessToken
    })
    res.status
    

});


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
