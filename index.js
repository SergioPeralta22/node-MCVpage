// const express = require('express');
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';

//*create express app

const app = express();

//*db connection
try {
    await db.authenticate();
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

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
