const nodemailer = require('nodemailer');

async function sendEmail(address, link) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS,
        },
    });
    const forgotEmail = {
        from: process.env.MAIL,
        to: address,
        subject: "Password Reset",
        html:`
        <h3>Please reset your password by clicking on this link: <a href="${link}">Email reset</a></h3>`
    }
    transporter.sendMail(forgotEmail, function (err, info) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    });
}

module.exports = sendEmail;