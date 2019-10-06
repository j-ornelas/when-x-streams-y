require('dotenv').config();
import express from 'express';

const { PORT } = process.env;

const app = express();

app.get('/', (req, res) => res.send('hello'));

app.listen(PORT, () => console.log(`wxsy listening on port: ${PORT}!`));
