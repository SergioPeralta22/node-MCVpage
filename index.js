// const express = require('express');
import express from 'express';
import userRoutes from './routes/userRoutes.js';

//*create express app

const app = express();

//*enable pug
app.set('view engine', 'pug');
app.set('views', './views');

//routing
// app.get('/', userRoutes);
// app.get('/users', userRoutes);
//.use trae todas las rutas que coincidan. en este caso traera todos las que empiecen con /

app.use('/auth', userRoutes);

//*define port and run

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
