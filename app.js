const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoute');

app.use(morgan('dev'));
// It enables the visualiation of the content created on postman in the terminal, if using console.log(req.body) (POST)
app.use(express.json());
// Defining a middleware
app.use((req, res, next) => {
    console.log('Hello from the middleware!');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

