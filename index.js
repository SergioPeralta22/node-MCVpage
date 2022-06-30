// const express = require('express');
import express from 'express';
import userRoutes from './routes/userRoutes.js';

//*create express app

const app = express();

//*enable pug
app.set('view engine', 'pug');
app.set('views', './views');

//* carpeta publica
app.use(express.static('public'));

//*routing
app.use('/', userRoutes);

//*define port and run

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
