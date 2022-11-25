const nodemailer = require('nodemailer');

async function sendEmail(address, link) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.MAIL, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
        },
    });
    const forgotEmail = {
        from: "noreply@casaycomidatechsupport.com",
        to: address,
        subject: "Password Reset",
        html:`
        <h3>Please reset your password by clicking on this link: <a href=${link}</a></h3>`
    }
    const info = transporter.sendMail(forgotEmail);
}

module.exports = sendEmail;