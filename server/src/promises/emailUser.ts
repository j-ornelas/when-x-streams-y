import { UserInterface } from '../database/models/UserModel';
import { SubscriptionInterface } from '../database/models/SubscriptionModel';

import nodemailer from 'nodemailer';

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const emailUser = (user:UserInterface, { streamName, gameName }:SubscriptionInterface) => new Promise(async (resolve, reject) => {
  const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: EMAIL_ADDRESS,
          pass: EMAIL_PASSWORD
      }
  });

  const mailOptions = {
    from: 'WXSY - no-reply', // sender address
    // to: 'bar@example.com, baz@example.com', // list of receivers
    to: user.email.toString(),
    subject: `${streamName} is now playing ${gameName}!`, // Subject line
    html: `
      <h3>Greetings from WXSY!</h3>
      <h4>${streamName.toUpperCase()} is playing ${gameName.toUpperCase()}
      <h6>You're recieving this notification because you subscribed to this specific streamer/game combo</h6>
      <a href=https://www.twitch.tv/${streamName}>Click here to begin watching!<a>
    `
  };

  // send mail with defined transpor
  transporter.sendMail(mailOptions, (err, info) => {
     if(err) {
       console.log('err', err)
     } else {
       console.log('info', info);
     }
  });
});

export default emailUser;
