import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { User } from '../models/UserModel';
import { Subscription } from '../models/SubscriptionModel';
import notifyUsers from '../../promises/notifyUsers';
const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// info from twitch webhook, triggered by change in streamer status.
interface StreamChangeInterface {
  id: String;
  user_id: String;
  user_name: String;
  game_id: String;
  community_ids: [String];
  type: String;
  title: String;
  viewer_count: Number;
  started_at: String;
  language: String;
  thumbnail_url: String;
}
interface TwitchWebhookInterface extends Request {
  body: { data: [StreamChangeInterface] };
}
// TODO: set interface on req.
router.post('/', async (req, res:Response) => {
  try {
    // TODO: we'll need to revisit this once webhooks are set up!!!
    // if (!req.body.data.length) res.send({ message: 'no info from twitch' });
    const { user_id, game_id } = req.body;
    console.log('attempting to find subscriptino with userid and gameid,', user_id, game_id);
    // get streamer name and game name from twitch?
    // find subscriptionsId in our DB that match user/game;
    const activeSubscription = await Subscription.findOne({
      streamerId: user_id,
      gameId: game_id,
    });
    if (!activeSubscription) return res.send({ message: 'No users subscribed to this streamer/game'});
    // find users that have that subscriptionId.
    const usersToNotify = await User.find(
      { subscriptions: [activeSubscription._id] }
    );
    // do work on each of those users.
    await notifyUsers(usersToNotify);
    // todo: remove this temp res:
    res.send(`notified ${usersToNotify.length} users`)
    // send twitch info that it craves.
  } catch(err) {
    // TODO: handle errors
    console.log('err:', err.toString())
  }
});

export const TwitchController = router;
