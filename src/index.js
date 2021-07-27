const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW || './';
const auth= require("./auth.js")

app.use(express.static(www));
console.log(`serving ${www}`);

/** Routers */
const usersRouter = require('./routes/users_routes');
app.use('/users',usersRouter);

const authRouter = require('./routes/auth_routes');
app.use('/authorization',authRouter);

app.get('/health_check', (req, res) => {
    res.status(200).json({
        status: 'OK'
    });
    
});

app.get('*', (req, res) => {
    res.status(404).json({
        mensaje: 'No matching resource found for given API Request'
    });
    
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
