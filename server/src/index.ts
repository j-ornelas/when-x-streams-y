require('dotenv').config();
require('./database');
import express from 'express';
/* ******** CONTROLLERS ******** */
import { UserController } from './database/controllers/userController';
import { TwitchController } from './database/controllers/twitchController';
import { LoginController } from './database/controllers/loginController';
/* *********** CONFIG ********** */
const { PORT } = process.env;
const app = express();
/* ********** ROUTES *********** */
app.use('/users', UserController);
app.use('/twitch', TwitchController);
app.use('/auth', LoginController);
app.get('/', (req, res) => res.send('wxsy coming soon')); //TODO: send react app.
/* ******** SERVER INIT ******** */
app.listen(PORT, () => console.log(`wxsy listening on port: ${PORT}!`));
