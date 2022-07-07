// const express = require('express');
import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';

//*create express app

const app = express();

//*Habilitar lectura de datos de formularios

app.use(express.urlencoded({ extended: true }));

//*Habilitar lectura de cookies

app.use(cookieParser());

//*Habilitar CSRF

app.use(csrf({ cookie: true }));

//*db connection
try {
    await db.authenticate(); //*se conecta a la base de datos
    db.sync(); //*crea tabla en db
    console.log('DB connected');
} catch (error) {
    console.log('DB connection error');
}

//*enable pug
app.set('view engine', 'pug');
app.set('views', './views');

//* carpeta publica
app.use(express.static('public'));

//*routing
app.use('/', userRoutes);

//*define port and run

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
