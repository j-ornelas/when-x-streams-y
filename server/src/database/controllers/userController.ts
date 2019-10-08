import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { User } from '../models/UserModel';
import { Subscription } from '../models/SubscriptionModel';
const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

const { TWITCH_CLIENT_ID } = process.env;

router.get('/get', async (req:Request, res:Response) => {
  try {
    const users = await User.find();
    res.send({ users, success: true })
  } catch(err) {
    res.send({ employees: []})
  }
});

interface SubRequestInterface extends Request {
  body: {
    userId: String;
    streamName: String;
    gameName: String;
  };
}
router.post('/add-subscription', async (req:SubRequestInterface, res:Response) => {
  try {
    let { userId, streamName, gameName } = req.body;
    // getStreamerId
    const twitchStreamerRequest = await fetch(`https://api.twitch.tv/helix/users?login=${streamName}`, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID || ''
      }
    })
    const streamerData = await twitchStreamerRequest.json();
    if (!streamerData || !streamerData.data || !streamerData.data.length) return res.send({ message: `We couldn't find a streamer with the name ${streamName}` });
    const streamerId = streamerData.data[0].id;
    // getGameId
    const twitchGameRequest = await fetch(`https://api.twitch.tv/helix/games?name=${gameName}`, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID || ''
      }
    })
    const gameData = await twitchGameRequest.json();
    if (!gameData || !gameData.data || !gameData.data.length) return res.send({ message: `We couldn't find a game with the name ${gameName}` });
    const gameId = gameData.data[0].id;

    let previousSubscription = await Subscription.findOne({
      streamerId,
      gameId,
    });
    let subscriptionId;

    if (!previousSubscription) {
      // create subscription;
      console.log('CREATING NEW SUB')
      await new Subscription({
        streamerId,
        gameId,
        streamName,
        gameName
      }).save();

      const newSubscription = await Subscription.findOne({
        streamerId,
        gameId,
      });
      subscriptionId = (newSubscription && newSubscription._id);
    } else {
      console.log('FOUND SUB IN DB');
      subscriptionId = previousSubscription._id
    }
    if (!subscriptionId) return res.send({ message: 'something went wrong' });
    const user = await User.updateOne(
      { _id: userId },
      { $push: { subscriptions: subscriptionId }}
    );
    res.send({ user, success: true })
  } catch(err) {
    res.send({ message: `unable to update user. info: ${err.toString()}` });
  }
});


interface CreateUserInterface extends Request {
  body: {
    email: String;
  };
}
router.post('/create', async (req:CreateUserInterface, res:Response) => {
  try {
    const { email } = req.body;
    const user = await User.create({ email });
    res.send({ user, success: true })
  } catch(err) {
    res.send({ message: `unable to update user. info: ${err.toString()}` });
  }
});

export const UserController = router;
