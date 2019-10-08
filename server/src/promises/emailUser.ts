import { UserInterface } from '../database/models/UserModel';
import nodemailer from 'nodemailer';

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const emailUser = (user:UserInterface) => new Promise(async (resolve, reject) => {
  console.log('email stuff', EMAIL_ADDRESS, EMAIL_PASSWORD)
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
    subject: 'A subscriber you follow just went live', // Subject line
    html: '<h1>Hello world?</h1>' // html body
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
