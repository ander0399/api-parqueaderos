const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        return verify;
    }catch {
        return null;
    }
}

module.exports = verifyToken;