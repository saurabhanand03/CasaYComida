const nodemailer = require('nodemailer');

/**
 * @description: This function uses nodemailer to send a real-time email to the user
 * @param {string} address - email address of the user
 * @param {string} link - reset password link to be sent to the user
 */
async function sendEmail(address, link) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS,
        },
    });
    
    //This is what the email will look like when sent to the user
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
        //Used to check if email sent successfully
        console.log("Sent: " + info.response);
    });
}

module.exports = sendEmail;