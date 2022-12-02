const jwt = require('jsonwebtoken');

/**
 * @description: This function is used to authenticate or verify a token and return if it's valid or not
 * @param {string} token - The token to be verified
 */

async function authenticate (req, res, next) {
    const authToken = req.headers.authorization;
    if(authToken) {
        const token = authToken.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.status(401).json("Session expired!");
            }
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("Weird error!");
    }
}

module.exports = authenticate;