//* ====================================================================================
//* === crear nuestro primer servidor con los m贸dulos que vienen por defecto en node ===
//* ====================================================================================
// crear un servidor a mano | sin express | m贸dulo nativo HTTP

//* === llamar m贸dulo http ===
// const http = require('http');

//* === configurar puerto ===
// const port = 5000;

//* === crear servidor ===
//* req -> petici贸n/requerimiento del cliente
//* res -> respuesta del servidor | podemos responder con: json / html / texto plano / archivo 
// const server = http.createServer((req, res) => {
//     res.end('esta es la respuesta 馃殌');
// });

//* === escuchar al servidor ===
// server.listen(port, () => console.log('funcionando 馃槏'));


//============================================================================================
//============================================================================================
//============================================================================================


//* =================================================
//* === crear nuestro primer servidor con express ===
//* =================================================
// express es m谩s flexible que trabajar con el m贸dulo nativo HTTP
// del ejemplo anterior

//* === llamar m贸dulo express ===
const express = require('express');

//* === llamar m贸dulo fileSystem ===
const fs = require('fs');

//* === instanciar express en app ===
const app = express();

//* === configurar puerto ===
const port = 3000;

//* === middleware | p谩ginas est谩ticas | 'use' ===
//* configurar antes de las rutas
//* carpeta 'public' -> archivos est谩ticos | html, css, img
app.use(express.static('public'));

//* === middleware | procesar formularios | POST ===
//* para poder leer los req.body que vienen de un formulario
app.use(express.urlencoded({ extended: true }));

//* === rutas | crear servidor ===
//* cuando el cliente haga una petici贸n GET en el index/raiz
//* responde/envia algo
//* req -> petici贸n/requerimiento del cliente
//* res -> respuesta del servidor | podemos responder con: json / html / texto plano / archivo 

// === capturar info ===
// la info viaja por la URL (query)
// app.get('/formulario', (req, res) => {
//     console.log(req.query);
//     res.send('Formulario enviado...' + req.query.nombre);
// });

// === enviar info ===
// la info viaja por el CUERPO (body) de la petici贸n HTTP
app.post('/formulario', (req, res) => {
    console.log(req.body);

    // destructuring | nombre / apellido
    const { nombre, apellido} = req.body;
    // validaci贸n | redireccionar
    if (!nombre || !apellido) return res.redirect('/error.html');
    // crear archivo | txt
    fs.writeFile(`archivos/${nombre}.txt`, apellido, (err) => {
        // validaci贸n | envia mensaje error
        if(err) return res.send('Fall贸 al crear el archivo');
        res.download(__dirname + `/archivos/${nombre}.txt`);
    });    
});

app.get('/', (req, res) => {
    res.send('Visitaste la p谩gina de inicio');
});

app.get('/bluuweb', (req, res) => {
    res.send('Visitaste a bluuweb');
});

app.post('/bluuweb', (req, res) => {
    res.send('Visitaste a bluuweb a trav茅s del POST');
})

//* === escuchar al servidor ===
app.listen(port, () => console.log('馃殌馃殌馃殌馃殌'));