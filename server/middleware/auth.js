const jwt = require('jsonwebtoken');


const VerifyAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            res.status(400).json({ message: "Token not getted" });
        }

        await jwt.verify(token, "podInterViewAssignMents", (err, user) => {
            if (err) {
                res.status(400).json({ message: "Invalid two Authentication" });
            } else {
                req.user = user;
                next()
            }

        })

    } catch (error) {
        res.status(400).json({ message: "Invalid Authentication" });
    }
}


module.exports = VerifyAuth;