import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWOR,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export default smtpTransport;
