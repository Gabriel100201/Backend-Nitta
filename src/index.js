const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { PORT } = require('./constants.js');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json()); // middleware para procesar el cuerpo de solicitudes POST en formato JSON

app.get('/', (req, res) => {
    res.send('hello word');
});
app.get('/api/data', (req, res) => {
    fs.readFile('./src/json/IMGDATA.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer el archivo JSON');
        }
        else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    })
});

app.post('/api/data', (req, res) => {
    fs.readFile('./src/json/IMGDATA.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer el archivo JSON');
        }
        else {
            const jsonData = JSON.parse(data);
            jsonData.push(req.body); // Agregar la solicitud POST al JSON
            fs.writeFile('./src/json/IMGDATA.json', JSON.stringify(jsonData), (err) => { // Escribir el JSON actualizado en el archivo
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al escribir en el archivo JSON');
                }
                else {
                    res.send('Solicitud POST procesada y agregada al archivo JSON');
                }
            });
        }
    });
});

app.delete('/api/data', (req, res) => {
    fs.readFile('./src/json/IMGDATA.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al leer el archivo JSON');
        }
        else {
            const jsonData = JSON.parse(data);
            jsonData.forEach((element, index) => {
                if (element.id === req.body.id){
                    jsonData.splice(index, 1)
                }
            })
            fs.writeFile('./src/json/IMGDATA.json', JSON.stringify(jsonData), (err) => { // Escribir el JSON actualizado en el archivo
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al escribir en el archivo JSON');
                }
                else {
                    res.send('Solicitud POST procesada y agregada al archivo JSON');
                }
            });
        }
    })
})

app.listen(PORT);
console.log(`Escuchando en el puerto: ${PORT}`);