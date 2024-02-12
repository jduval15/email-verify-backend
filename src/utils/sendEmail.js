const nodemailer = require('nodemailer');

const sendEmail = (options) => {

   const transporter = nodemailer.createTransport({
       service: 'gmail', 
       auth: {
           pass: process.env.PASSWORD,
           user: process.env.EMAIL
           
       },
       tls: {
           rejectUnauthorized: false
       },
   });

   const mailOptions = {
       from: process.env.EMAIL,
        ...options
}

   transporter.sendMail(mailOptions, function (error, info) {
       if (error) {
           console.log(error);
       } else {
           console.log('Email sent: ' + info.response);
       }
   });
}

module.exports = { sendEmail }