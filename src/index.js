const express = require('express')

const app = express();

app.get('/', function(req, res) {
    res.send('hello word')
})

app.listen(3000);
console.log('Escuchando en el puerto 3000')