const express = require('express')
const PORT = require('./constants.js')
const app = express();

app.get('/', function(req, res) {
    res.send('hello word')
})

app.listen(PORT);
console.log(`Escuchando en el puerto: ${PORT}`)