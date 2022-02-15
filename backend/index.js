const cors = require('cors');
const express = require('express');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const routers = require('./src/routers');

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use(routers);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Todo List app listening on port ${port}!`));
