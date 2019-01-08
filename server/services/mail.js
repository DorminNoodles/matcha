const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'matchaducancer@gmail.com',
            pass: 'Suceboule42'
        }
    });

    let mailOptions = {
        from: '"Fred Foo 👻" <matchaducancer@gmail.com>',
        to: 'hypertyson@hotmail.fr',
        subject: 'Hello ✔ Ganesh',
        text: 'Hello world?',
        html: '<b>Hello world?</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
});