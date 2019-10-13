const passport = require('passport');
import { Strategy as twitchStrategy } from 'passport-twitch-new';
import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
const twitchStrategyOptions = {
  clientID: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3003/auth/twitch/callback',
  scope: 'user_read'
}
router.use(passport.initialize());
passport.use(new twitchStrategy(twitchStrategyOptions, (accessToken:any, refreshToken:any, profile:any, done:any) => { // TODO: UPDATE THESE ANYS YO
  console.log('twitch info', accessToken, refreshToken, profile);
  // whatever we send here will be added to req in callback. aka user = req.user.
  return done(null, profile);
}))

router.get('/failure', (req, res) => res.send({ message: 'authtentication failed!' })); // TODO: handle this more elegantly

const callbackOptions = { failureRedirect: '/failure', session: false }
router.get('/twitch', passport.authenticate('twitch'));

router.get('/twitch/callback', passport.authenticate('twitch', callbackOptions), (req:Request, res:Response) => {
  // res.send({ success: true, user })
  // TODO: we should create a temporary (30 second token), redirect with it in the url, then use it to get info from the DB,
  // then load the app as normal with the data from the db, including a token of some sort.
  res.redirect(`/${req.user.id}`);
});

export const LoginController = router;
