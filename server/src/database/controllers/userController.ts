import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { User } from '../models/UserModel';
const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

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
    subscriptionId: String;
  };
}
router.post('/add-subscription', async (req:SubRequestInterface, res:Response) => {
  try {
    const { userId, subscriptionId } = req.body;
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
