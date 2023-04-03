const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Importar el módulo CORS

const { PORT } = require('./constants.js');
const app = express();

app.use(cors()); // Usar el middleware CORS

app.get('/', function(req, res) {
    res.send('hello word');
});

app.get('/api/data', (req, res) => {
    fs.readFile('./src/DBZ.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer el archivo JSON');
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.listen(PORT);
console.log(`Escuchando en el puerto: ${PORT}`);