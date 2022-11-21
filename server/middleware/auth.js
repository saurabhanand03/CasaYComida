const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
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

module.exports = auth;