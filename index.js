//* ====================================================================================
//* === crear nuestro primer servidor con los módulos que vienen por defecto en node ===
//* ====================================================================================
// crear un servidor a mano | sin express | módulo nativo HTTP

//* === llamar módulo http ===
// const http = require('http');

//* === configurar puerto ===
// const port = 5000;

//* === crear servidor ===
//* req -> petición/requerimiento del cliente
//* res -> respuesta del servidor | podemos responder con: json / html / texto plano / archivo 
// const server = http.createServer((req, res) => {
//     res.end('esta es la respuesta 🚀');
// });

//* === escuchar al servidor ===
// server.listen(port, () => console.log('funcionando 😍'));


//============================================================================================
//============================================================================================
//============================================================================================


//* =================================================
//* === crear nuestro primer servidor con express ===
//* =================================================
// express es más flexible que trabajar con el módulo nativo HTTP
// del ejemplo anterior

//* === llamar módulo express ===
const express = require('express');

//* === llamar módulo fileSystem ===
const fs = require('fs');

//* === instanciar express en app ===
const app = express();

//* === configurar puerto ===
const port = 3000;

//* === middleware | páginas estáticas | 'use' ===
//* configurar antes de las rutas
//* carpeta 'public' -> archivos estáticos | html, css, img
app.use(express.static('public'));

//* === middleware | procesar formularios | POST ===
//* para poder leer los req.body que vienen de un formulario
app.use(express.urlencoded({ extended: true }));

//* === rutas | crear servidor ===
//* cuando el cliente haga una petición GET en el index/raiz
//* responde/envia algo
//* req -> petición/requerimiento del cliente
//* res -> respuesta del servidor | podemos responder con: json / html / texto plano / archivo 

// === capturar info ===
// la info viaja por la URL (query)
// app.get('/formulario', (req, res) => {
//     console.log(req.query);
//     res.send('Formulario enviado...' + req.query.nombre);
// });

// === enviar info ===
// la info viaja por el CUERPO (body) de la petición HTTP
app.post('/formulario', (req, res) => {
    console.log(req.body);

    // destructuring | nombre / apellido
    const { nombre, apellido} = req.body;
    // validación | redireccionar
    if (!nombre || !apellido) return res.redirect('/error.html');
    // crear archivo | txt
    fs.writeFile(`archivos/${nombre}.txt`, apellido, (err) => {
        // validación | envia mensaje error
        if(err) return res.send('Falló al crear el archivo');
        res.download(__dirname + `/archivos/${nombre}.txt`);
    });    
});

app.get('/', (req, res) => {
    res.send('Visitaste la página de inicio');
});

app.get('/bluuweb', (req, res) => {
    res.send('Visitaste a bluuweb');
});

app.post('/bluuweb', (req, res) => {
    res.send('Visitaste a bluuweb a través del POST');
})

//* === escuchar al servidor ===
app.listen(port, () => console.log('🚀🚀🚀🚀'));