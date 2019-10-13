import passport from 'passport';
import { Strategy as twitchStrategy } from 'passport-twitch-new'; // TODO: add typefile from passport-twitch, it should be identical
import { Router, Request, Response } from 'express';
import { User } from '../models/UserModel';
import { validateAuth } from '../../middleware/validateAuth';
import bodyParser from 'body-parser';
/* *********** CONFIG ********** */
const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
/* *********** PASSPORT CONFIG ********** */
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
const twitchStrategyOptions = {
  clientID: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3003/auth/twitch/callback',
  scope: 'user_read'
}
const callbackOptions = { failureRedirect: '/failure', session: false };
/* *********** LOCAL LOGIN ********** */
interface LocalAuthReqInterface extends Request {
  body: {
    email: string;
  };
}
router.post('/local', validateAuth, async (req:LocalAuthReqInterface, res:Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOrCreate(email)
    res.send({ user, success: true });
  } catch(err) {
    res.send({ message: `unable to update user. info: ${err.toString()}` });
  }
});
/* *********** TWITCH LOGIN ********** */
router.use(passport.initialize());
passport.use(new twitchStrategy(twitchStrategyOptions, (accessToken:any, refreshToken:any, profile:any, done:any) => { // TODO: UPDATE THESE ANYS YO (see above)
  return done(null, profile);
}))
router.get('/twitch', passport.authenticate('twitch'));
router.get('/twitch/callback', passport.authenticate('twitch', callbackOptions), (req:Request, res:Response) => {
  // TODO: we should create a temporary (30 second token), redirect with it in the url, then use it to get info from the DB,
  // then load the app as normal with the data from the db, including a token of some sort.
  res.redirect(`/${req.user.id}`);
});
/* *********** FAILURE REDIRECT ********** */
router.get('/failure', (req, res) => res.send({ message: 'authtentication failed!' })); // TODO: handle this more elegantly

export const LoginController = router;
